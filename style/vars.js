// https://material-ui.com/customization/themes/#palette
// 	// type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// 	// [theme.breakpoints.between('sm', 'md')]: {
// 	// [theme.breakpoints.only('md')]: {
// const { palette, shadows, transitions, breakpoints } = theme;
const __unit = '10px';
const __fontSize = `calc(1.6 * ${__unit})`;
const __fontFamily = 'Roboto, Helvetica, Arial, sans-serif';


export const __ = {
	borderRadius: 2,
	fontSizeBig: 16,
	fontSizeSmall: 12,
	colorBg: 'rgb(250, 250, 250)',
	colorPrimary: 'rgb(33, 150, 243)',
	colorAccent: 'rgb(255, 64, 129)',
	colorTextMuted: 'rgb(97, 97, 97)',
	colorDivider: 'rgb(224, 224, 224)',

	colorSuccess: 'rgb(67, 160, 71)',
  colorWarning: 'rgb(253, 216, 53)',
  colorDark: 'rgb(33, 33, 33)',

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


	shadow2p: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
	shadow3p: '0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
	shadow4p: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
	shadow6p: '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2)',
	shadow8p: '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
	shadow16p: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
	zdepthShadow1: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
  zdepthShadow2: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
  zdepthShadow3: '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)',
  zdepthShadow4: '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)',
  zdepthShadow5: '0 19px 60px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.22)',


	fontFamily: __fontFamily,
	listUnstyled: {
		fontFamily: __fontFamily,
		listStyle: 'none none',
		margin: 0,
		padding: 0
	}
}
