<?php

namespace Drupal\itk_iframe_field;

/**
 * Parses and matches the "accepted domains" setting of an iframe field.
 *
 * The setting is a textarea holding one domain per line. A domain matches that
 * exact host only; subdomains must be listed separately.
 */
final class AllowedDomains {

  /**
   * The only scheme an iframe is embedded with.
   *
   * Our site is served over https, so browsers would block an http iframe as
   * mixed content anyway.
   */
  private const EMBED_SCHEME = 'https';

  /**
   * Schemes a URL may use to be rendered at all, as an iframe or a link.
   *
   * Anything else - "javascript:", "data:", a scheme-relative "//host/" or an
   * internal Drupal path - has no domain that can be matched against the list,
   * and HTML-escaping does not neutralise a "javascript:" or "data:" href.
   */
  private const SAFE_SCHEMES = ['http', 'https'];

  /**
   * Matches a lowercased host name.
   */
  private const DOMAIN_REGEX = '/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/';

  /**
   * Parses a textarea value into a list of domains.
   *
   * Blank lines and "#" comments are skipped.
   *
   * @param string $value
   *   The raw value of the "accepted domains" field setting.
   *
   * @return string[]
   *   Lowercased domains, without duplicates.
   */
  public static function parse(string $value): array {
    $domains = [];
    foreach (preg_split('/\R/', $value) ?: [] as $line) {
      $line = trim($line);
      if ('' === $line || str_starts_with($line, '#')) {
        continue;
      }
      $domains[] = strtolower($line);
    }

    return array_values(array_unique($domains));
  }

  /**
   * Tells whether a line of the setting is a valid domain.
   *
   * @param string $line
   *   One line of the "accepted domains" field setting.
   *
   * @return bool
   *   TRUE if the line is a bare host name such as "example.com".
   */
  public static function isValidDomain(string $line): bool {
    return 1 === preg_match(self::DOMAIN_REGEX, strtolower(trim($line)));
  }

  /**
   * Tells whether a URL is safe to put in an "src" or "href" attribute.
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

    return in_array(strtolower($parts['scheme']), self::SAFE_SCHEMES, TRUE);
  }

  /**
   * Tells whether a URL may be embedded as an iframe.
   *
   * It must be an https URL on one of the accepted domains. An empty list
   * accepts nothing: until domains are configured no URL is embedded.
   *
   * @param string $url
   *   The absolute URL that would become the iframe's "src".
   * @param string[] $domains
   *   Domains as returned by ::parse().
   *
   * @return bool
   *   TRUE if an iframe may be rendered for this URL.
   */
  public static function isAllowed(string $url, array $domains): bool {
    if ([] === $domains || !self::isSafeUrl($url)) {
      return FALSE;
    }

    $parts = parse_url($url);

    return self::EMBED_SCHEME === strtolower($parts['scheme'])
      && in_array(strtolower($parts['host']), $domains, TRUE);
  }

}
