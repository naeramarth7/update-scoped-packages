# update-scoped-packages

Update all packages within a given scope (e.g. @nestjs).

## Usage

```sh
npx update-scoped-packages <scope> (<version>)
```

## Examples

Update all `@angular/*` packages to the latest version:

```sh
npx update-scoped-packages @angular

# Output:
[update-scoped-packages] Updating dependencies:
  * @angular/core@latest
  * @angular/common@latest
  * ...
[update-scoped-packages] DONE
```

Update all `@angular/*` packages to a specific version:

```sh
npx update-scoped-packages @angular 12

# Output:
[update-scoped-packages] Updating dependencies:
  * @angular/core@12
  * @angular/common@12
  * ...
[update-scoped-packages] DONE
```
