import { ThemeVars } from "@mysten/dapp-kit";
import "./global.css";
// var(--teal-5) interactive components
// var(--teal-8) borders and separators
// var(--teal-12) text
export const tealTheme: ThemeVars = {
	blurs: {
		modalOverlay: 'blur(1rem)',
	},
	backgroundColors: {
		primaryButton: 'var(--teal-5)',        // Componentes interactivos
		primaryButtonHover: 'var(--teal-6)',   // Hover más oscuro
		outlineButtonHover: 'var(--teal-3)',   // Fondo hover para botones outline
		modalOverlay: 'rgba(24, 36, 53, 0.6)',
		modalPrimary: 'var(--teal-1)',         // Fondo claro para modal
		modalSecondary: 'var(--teal-2)',       // Segundo plano modal
		iconButton: 'transparent',
		iconButtonHover: 'var(--teal-4)',      // Hover iconos
		dropdownMenu: 'var(--teal-2)',         // Fondo dropdown
		dropdownMenuSeparator: 'var(--teal-8)',// Separadores (bordes)
		walletItemSelected: 'var(--teal-3)',   // Item seleccionado
		walletItemHover: 'var(--teal-4)',      // Hover items
	},
	borderColors: {
		outlineButton: 'var(--teal-8)',        // Bordes según especificación
	},
	colors: {
		primaryButton: '#fff',                 // Texto blanco sobre Teal
		outlineButton: 'var(--teal-12)',       // Texto usando Teal-12
		iconButton: 'var(--teal-12)',          // Iconos oscuros
		body: 'var(--teal-12)',                // Texto principal
		bodyMuted: 'var(--teal-11)',           // Texto secundario
		bodyDanger: '#FF794B',
	},
	radii: {
		small: '6px',
		medium: '8px',
		large: '12px',
		xlarge: '16px',
	},
	shadows: {
		primaryButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
		walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.05)',
	},
	fontWeights: {
		normal: '400',
		medium: '500',
		bold: '600',
	},
	fontSizes: {
		small: '14px',
		medium: '16px',
		large: '18px',
		xlarge: '20px',
	},
	typography: {
		fontFamily: "'Pixel Operator', sans-serif",
		fontStyle: 'normal',
		lineHeight: '1.3',
		letterSpacing: '1px',  // Corregido valor (faltaba px)
	},
};