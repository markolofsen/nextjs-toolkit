// https://material-ui.com/customization/themes/#palette
// 	// type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// 	// [theme.breakpoints.between('sm', 'md')]: {
// 	// [theme.breakpoints.only('md')]: {
// const { palette, shadows, transitions, breakpoints } = theme;
const __unit = '10px';
const __fontSize = `calc(1.6 * ${__unit})`;

export const __ = {
	borderRadius: 2,
	fontSizeBig: 16,
	fontSizeSmall: 12,
	colorBg: 'rgb(250, 250, 250)',
	colorPrimary: 'rgb(33, 150, 243)',
	colorAccent: 'rgb(255, 64, 129)',
	colorTextMuted: 'rgb(97, 97, 97)',
	colorDivider: 'rgb(224, 224, 224)',

	fontSizeTiny: `calc(1.2 * ${__unit})`,
	fontSizeSmall: `calc(1.4 * ${__unit})`,
	fontSizeNormal: __fontSize,
	fontSizeBig: `calc(1.8 * ${__unit})`,
	fontWeightThin: 300,
	fontWeightNormal: 400,
	fontWeightSemiBold: 500,
	fontWeightBold: 700,

	transition2: 'all .2s ease-in-out !important',
	transition5: 'all .5s ease-in-out !important',
}
