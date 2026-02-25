# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Høringsportal (deltag.aarhus.dk) is a Drupal 10 civic engagement platform for Aarhus municipality.
It enables citizens to participate in public hearings, submit citizen proposals, attend public meetings,
and engage with local projects.

## Development Commands

This project uses [Task](https://taskfile.dev/) for all development workflows. Run `task` to see available commands.

### Essential Commands

```bash
# Initial setup (resets database)
task site-install

# Update existing installation
task site-update

# Build theme assets
task assets-build

# Watch for changes during development
task assets-watch

# Load test fixtures
task fixtures:load

# Run Drush commands
task drush -- <command>

# Access container
task compose -- exec phpfpm bash
```

### Code Quality

```bash
# Apply all coding standards (PHP, JS, CSS, Twig, YAML, Markdown)
task coding-standards:apply

# Check all coding standards
task coding-standards:check

# Static analysis (PHPStan)
task code-analysis

# Individual checks
task coding-standards:php:check
task coding-standards:twig:check
task coding-standards:javascript:check
task coding-standards:styles:check
```

### Testing

Playwright tests are located in `playwright/` directory:

```bash
docker compose --profile test run --rm playwright npx playwright test
```

## Architecture

### Directory Structure

- `web/modules/custom/` - Custom Drupal modules
- `web/themes/custom/hoeringsportal/` - Main theme (Bootstrap 5, Webpack Encore)
- `web/themes/custom/hoeringsportal_admin/` - Admin theme
- `config/sync/` - Drupal configuration

### Core Custom Modules

- **hoeringsportal_hearing** - Hearing (høring) content type and functionality
- **hoeringsportal_citizen_proposal** - Citizen proposal system with OpenID Connect authentication
- **hoeringsportal_public_meeting** - Public meetings with Pretix integration for ticketing
- **hoeringsportal_activity** - Extends public meetings to include other activity types
- **hoeringsportal_project** - Project content type for civic engagement projects
- **hoeringsportal_deskpro** - Deskpro helpdesk integration for hearing replies
- **hoeringsportal_data** - Data helpers and API endpoints
- **hoeringsportal_dialogue** - Dialogue/discussion features with comments
- **hoeringsportal_anonymous_edit** - Allow anonymous users to edit their submissions
- **hoeringsportal_openid_connect** - OpenID Connect authentication customizations

### External Integrations

- **Pretix** - Event ticketing for public meetings (docker-compose.pretix.yml)
- **Deskpro** - Helpdesk for hearing submissions
- **OpenID Connect** - Citizen authentication (docker-compose.oidc.yml)
- **ClamAV** - Virus scanning for uploads
- **Serviceplatformen** - Danish government services integration

### Theme Architecture

The theme uses Webpack Encore for asset building:

```bash
# Theme location
web/themes/custom/hoeringsportal/

# Build commands
npm install --prefix web/themes/custom/hoeringsportal
npm run build --prefix web/themes/custom/hoeringsportal
```

CSS uses SCSS with Bootstrap 5 and CSS custom properties for color management.

## Coding Standards

- PHP follows Drupal coding standards (phpcs.xml.dist)
- PHPStan level 0 for custom modules, level 9 for hoeringsportal_audit_log
- Twig uses twig-cs-fixer
- JavaScript and CSS use Prettier
- YAML uses Prettier

## Docker Services

Primary services (docker-compose.yml):

- phpfpm (PHP 8.3)
- nginx
- mariadb
- memcached
- mail (Mailpit)

Optional profiles:

- `pretix` - Event ticketing system
- `test` - Playwright testing
- `dev` - Code quality tools (markdownlint, prettier)

Start optional services:

```bash
PROFILES=pretix task compose -- up --detach
```

## Configuration

Local settings go in `web/sites/default/settings.local.php`.
Environment variables can be set in `.env.local`.

Key settings:

- `TASK_DOCKER_COMPOSE_PROFILES` - Docker profiles to auto-start
- `TASK_ASSETS_SKIP_BUILD` - Skip asset building on site-update

## Translations

Import custom translations:

```bash
task translations:import
```

Translation files are in `translations/` and managed via Drush locale commands.
