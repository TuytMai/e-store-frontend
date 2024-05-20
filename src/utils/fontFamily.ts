import { Prompt, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const primary = Prompt({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const FONT = {
	inter,
	primary,
};

export default FONT;
