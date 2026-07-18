// Reproduces the exact markup the site used before content moved to MDX:
// every bullet becomes its own bare <p class="experience__description">,
// no visible list marker, no wrapping <ul>.
export const bulletListComponents = {
  ul: (props) => props.children,
  li: (props) => <p className="experience__description">{props.children}</p>,
  p: (props) => <p className="experience__description">{props.children}</p>,
};

// A single line of prose rendered as the inline <span> the education
// section has always used (Academic.jsx's institution field).
export const proseSpanComponents = {
  p: (props) => <span className="education__studies">{props.children}</span>,
};

// Unlike bulletListComponents, achievements keep the real <ul>/<li> markup
// so they render as a visible bulleted list.
export const achievementListComponents = {
  ul: (props) => <ul className="achievements__list">{props.children}</ul>,
  li: (props) => <li className="achievements__item">{props.children}</li>,
  p: (props) => <p className="achievements__item">{props.children}</p>,
};
