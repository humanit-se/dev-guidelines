# CSS guidelines

## Definitions

### keywords

*MUST* is used as a requirement.  
*SHOULD* is highly recommended.  
*MAY* is optional but encouraged.

## Introduction

We, almost always, use [SASS](http://sass-lang.com/). So it's basically a MUST. LESS, is sooooo last month.

We SHOULD use [Gulp](http://gulpjs.com/) to compile out SCSS/SASS. So go get [gulp-sass](https://www.npmjs.com/package/gulp-sass)

## Code standard

We follow AirBnB CSS guidelines. Below are the basics. See [https://github.com/airbnb/css](https://github.com/airbnb/css) for detailed documentation.

## Basics

- MUST use the .scss syntax, never the original .sass syntax.
- SHOULD order your regular CSS and @include declarations logically.
- SHOULD avoid @extend if possible since it can add complexity and side effects. [Why?](https://www.sitepoint.com/avoid-sass-extend/) and [but...why?](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)
- One SHOULD not nest selectors more than three levels deep!
- SHOULD use dashes over camelCasing in class names.
- SHOULD never use ID selectors. [Read why?](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)
- When using multiple selectors in a rule declaration, one SHOULD give each selector its own line.
- In declaration one MUST put a space before the opening brace ```{```.
- In properties, one MUST put a space after, but not before, the : character.
- In declaration one MUST put closing braces } of rule on a new line.
- MUST put blank lines between rule declarations.

**Bad:**
```
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```
**Good:**
```
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```

### Property order

Order properties for an easier debugging time and understanding of each others code.

**@include()** should always be last in the order list
**:before** and **:after** should come before any other sub-classes

Should avoid **@extend** if possible since it can add complexity and side effects.

```
.property-order {
  content:
  display:
  position:
  top|right|left|bottom: (properties in one line and order should be as to the left)
  transform:
  width:
  height:
  float:
  margin:
  padding:
  color:
  line-height:
  font-family:
  font-size:
  font-weight:
  text-align:
  text-transform:
  letter-spacing:
  cursor:
  pointer-events:
  border:
  background:
  transition:
  @include()

  &:after | &:before {}

  .other-classes {
    display: block;
    width: 100%;
    height: 20px;
  }
}
```

### Comments

- SHOULD use line comments (// in Sass-land) to block comments.
- SHOULD write detailed comments for code that isn't self-documenting: Uses of z-index or Compatibility or browser-specific hacks.

### JavaScript Hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

We recommend creating JavaScript-specific classes to bind to, prefixed with .js-:

```
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```
