<?php

namespace Drupal\itk_iframe_field;

/**
 * Parses and matches the "accepted domains" setting of an iframe field.
 *
 * The setting is a textarea holding one domain per line. A line is either a
 * bare host ("example.com"), which matches that host and nothing else, or a
 * wildcard ("*.example.com"), which matches any subdomain of it but not the
 * bare host itself. Lines may be pasted as full URLs; only the host is kept.
 */
final class AllowedDomains {

  /**
   * Schemes an iframe source is allowed to use.
   *
   * Anything else - "javascript:", "data:", a scheme-relative "//host/" or an
   * internal Drupal path - has no domain that can be matched against the list,
   * so it is never accepted.
   */
  private const ALLOWED_SCHEMES = ['http', 'https'];

  /**
   * Matches a normalized host pattern, optionally wildcarded.
   */
  private const PATTERN_REGEX = '/^(\*\.)?[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/';

  /**
   * Parses a textarea value into a list of host patterns.
   *
   * Blank lines and "#" comments are skipped.
   *
   * @param string $value
   *   The raw value of the "accepted domains" field setting.
   *
   * @return string[]
   *   Normalized host patterns, without duplicates.
   */
  public static function parse(string $value): array {
    $patterns = [];
    foreach (preg_split('/\R/', $value) ?: [] as $line) {
      $line = trim($line);
      if ('' === $line || str_starts_with($line, '#')) {
        continue;
      }
      $pattern = self::normalize($line);
      if (NULL !== $pattern) {
        $patterns[] = $pattern;
      }
    }

    return array_values(array_unique($patterns));
  }

  /**
   * Reduces a single line to a bare, lowercased, possibly wildcarded host.
   *
   * @param string $line
   *   One line of the "accepted domains" field setting.
   *
   * @return string|null
   *   The host pattern, or NULL if the line holds no host at all.
   */
  public static function normalize(string $line): ?string {
    $line = strtolower(trim($line));

    // Tolerate a pasted URL by keeping only its host.
    if (str_contains($line, '://')) {
      $line = (string) parse_url($line, PHP_URL_HOST);
    }
    else {
      // Drop a path, and any leading scheme-relative slashes.
      $line = explode('/', ltrim($line, '/'))[0];
    }

    // Drop credentials and port.
    $at = strrpos($line, '@');
    if (FALSE !== $at) {
      $line = substr($line, $at + 1);
    }
    $line = explode(':', $line)[0];

    // ".example.com" is a common spelling of "*.example.com".
    if (str_starts_with($line, '.')) {
      $line = '*' . $line;
    }

    return '' === $line ? NULL : $line;
  }

  /**
   * Tells whether a line is a usable domain pattern.
   *
   * @param string $line
   *   One line of the "accepted domains" field setting.
   *
   * @return bool
   *   TRUE if the line can be matched against iframe URLs.
   */
  public static function isValidPattern(string $line): bool {
    $pattern = self::normalize($line);

    return NULL !== $pattern && 1 === preg_match(self::PATTERN_REGEX, $pattern);
  }

  /**
   * Tells whether a URL is safe to put in an "src" or "href" attribute.
   *
   * A URL that fails this is not merely off the accepted list - it has no host
   * to match, and HTML-escaping does not neutralise a "javascript:" or "data:"
   * href, so it cannot be rendered as a link either.
   *
   * @param string $url
   *   The absolute URL resolved for the field item.
   *
   * @return bool
   *   TRUE if the URL is an absolute http(s) URL with a host.
   */
  public static function isSafeUrl(string $url): bool {
    $parts = parse_url($url);
    if (!is_array($parts) || empty($parts['host']) || empty($parts['scheme'])) {
      return FALSE;
    }

    return in_array(strtolower($parts['scheme']), self::ALLOWED_SCHEMES, TRUE);
  }

  /**
   * Tells whether a URL is served by one of the accepted domains.
   *
   * An empty pattern list accepts nothing: until domains are configured no URL
   * is embedded as an iframe.
   *
   * @param string $url
   *   The absolute URL that would become the iframe's "src".
   * @param string[] $patterns
   *   Host patterns as returned by ::parse().
   *
   * @return bool
   *   TRUE if an iframe may be rendered for this URL.
   */
  public static function isAllowed(string $url, array $patterns): bool {
    if ([] === $patterns || !self::isSafeUrl($url)) {
      return FALSE;
    }

    $host = strtolower((string) parse_url($url, PHP_URL_HOST));
    foreach ($patterns as $pattern) {
      if (self::hostMatches($host, $pattern)) {
        return TRUE;
      }
    }

    return FALSE;
  }

  /**
   * Matches a host against a single pattern.
   *
   * @param string $host
   *   The lowercased host of the iframe URL.
   * @param string $pattern
   *   A normalized host pattern.
   *
   * @return bool
   *   TRUE if the host matches.
   */
  private static function hostMatches(string $host, string $pattern): bool {
    if (str_starts_with($pattern, '*.')) {
      // Compare against ".example.com" so that "evilexample.com" cannot match
      // a "*.example.com" pattern, and so that the bare host does not either.
      $suffix = substr($pattern, 1);

      return str_ends_with($host, $suffix) && strlen($host) > strlen($suffix);
    }

    return $host === $pattern;
  }

}
