import { Inter, Prompt, Yesteryear } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const primary = Prompt({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const yesteryear = Yesteryear({
    subsets: ["latin"],
    weight: ["400"],
});

const FONT = {
    inter,
    primary,
    yesteryear,
};

export default FONT;
