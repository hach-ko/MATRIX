import { Header } from "../Header";
import { ThemeProvider } from "../ThemeProvider";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header cartCount={3} onMenuClick={() => console.log("Menu clicked")} />
    </ThemeProvider>
  );
}
