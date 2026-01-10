# AI Coding Guidelines for MobileDevelopment

## Project Overview
This is a React Native Expo app (v54) for browsing and searching products. It uses static JSON data for products, with screens for listing, searching, and viewing product details. Navigation is partially implemented with @react-navigation/native.

## Architecture
- **Screens**: Organized in `Screens/Product/` (ProductContainer, ProductList, ProductCard, SearchedProduct, SingleProduct)
- **Shared Components**: `Shared/` (Header with logo, Banner with Swiper carousel)
- **Data**: Static JSON at `assets/data/products.json` with product objects (_id, name, price, image, etc.)
- **Navigation**: NavigationContainer wraps the app; screens navigate via `useNavigation().navigate("Product Detail", { item })`
- **UI Library**: react-native-paper for components like Surface, Text, Searchbar

## Key Patterns
- **Component Props**: Pass product data as props (e.g., `<ProductCard {...item} />`)
- **Image Handling**: Use `uri` with fallback: `uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'`
- **Responsive Sizing**: Use `Dimensions.get('window')` for width/height calculations (e.g., `width / 2 - 20`)
- **Search**: Filter products by name in lowercase: `products.filter(i => i.name.toLowerCase().includes(text.toLowerCase()))`
- **Swiper Integration**: For banners, use `react-native-swiper` with autoplay and image array
- **Safe Areas**: Wrap headers in `SafeAreaView` from `react-native-safe-area-context`

## Workflows
- **Start App**: `npx expo start` (or `npm start`)
- **Run on Android**: `npm run android`
- **Install Packages**: `npm install` (e.g., recently added `react-native-swiper`)
- **Build**: Expo handles builds; use `expo build:android` for production APKs

## Conventions
- **File Structure**: Screens in folders by feature, shared components separate
- **State Management**: Local useState for search/filter (no global state yet)
- **Styling**: Inline styles with StyleSheet, responsive to screen dimensions
- **Navigation Params**: Pass full item object as route param for details
- **Fallbacks**: Always provide default images and handle empty data gracefully

## Dependencies
- Core: expo, react, react-native
- UI: react-native-paper, react-native-safe-area-context
- Navigation: @react-navigation/native (imported but navigator incomplete)
- Other: react-native-swiper for carousels, @expo/vector-icons for icons

Reference: `App.js` for root setup, `ProductContainer.js` for main logic, `products.json` for data schema.