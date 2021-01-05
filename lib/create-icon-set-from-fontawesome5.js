import { Platform } from './react-native';
import createMultiStyleIconSet from './create-multi-style-icon-set';

const FA5Style = {
  regular: 'regular',
  light: 'light',
  solid: 'solid',
  brand: 'brand',
};

function createFA5iconSet(glyphMap, metadata = {}, pro = false) {
  const metadataKeys = Object.keys(metadata);
  const fontFamily = `Font Awesome 5 ${pro ? 'Pro' : 'Free'}`;
  console.error(`FontAwesome: ${fontFamily}`);
  console.error(`FontAwesome Pro?: ${pro}`);

  function fallbackFamily(glyph) {
    for (let i = 0; i < metadataKeys.length; i += 1) {
      const family = metadataKeys[i];
      if (metadata[family].indexOf(glyph) !== -1) {
        return family === 'brands' ? 'brand' : family;
      }
    }

    return 'regular';
  }

  function glyphValidator(glyph, style) {
    const family = style === 'brand' ? 'brands' : style;
    if (metadataKeys.indexOf(family) === -1) return false;
    return metadata[family].indexOf(glyph) !== -1;
  }

  function createFontAwesomeStyle(style, fontWeight, family = fontFamily) {
    let styleName = style;
    let fontFile = `FontAwesome5_${pro ? `Pro_${styleName}` : styleName}.ttf`;

    if (styleName === 'Brands') {
      styleName = 'Regular';
      fontFile = 'FontAwesome5_Brands.ttf';
    }

    console.error(`FontAwesome Family: ${family}`);

    return {
      fontFamily: `${family}`,
      fontFile,
      fontStyle: {
        fontWeight,
      },
      glyphMap,
    };
  }

  const brandIcons = createFontAwesomeStyle(
    'Brands',
    '400',
    'Font Awesome 5 Free'
  );
  const lightIcons = createFontAwesomeStyle('Light', '300');
  const regularIcons = createFontAwesomeStyle('Regular', '400');
  const solidIcons = createFontAwesomeStyle('Solid', '900');
  const Icon = createMultiStyleIconSet(
    {
      brand: brandIcons,
      light: lightIcons,
      regular: regularIcons,
      solid: solidIcons,
    },
    {
      defaultStyle: 'regular',
      fallbackFamily,
      glyphValidator,
    }
  );

  return Icon;
}

export { createFA5iconSet, FA5Style };
