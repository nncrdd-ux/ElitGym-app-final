export const colorsLight = {
  primary: "#45c7cc", 
  secondary: "#1c1c1e",
  background: "#ffffff",
  text: "#1c1c1e",      
  border: "#e5e5ea",
};

export const colorsDark = {
  primary: "#45c7cc",    
  secondary: "#1c1c1e",  
  background: "#000000", 
  text: "#ffffff",       
  border: "#2c2c2e",
};

export const fontSize = {
  small: 12,
  medium: 16,
  large: 24,
};
export const getTheme = (darkmode: boolean) => {
  const colors = darkmode ? colorsDark : colorsLight;

  return {
    colors: colors,
    fontSize: fontSize,
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
    },
    globalStyles: {
      mainContainer: {
        flex: 1,
        backgroundColor: colors.background
      }
    }
  };
};