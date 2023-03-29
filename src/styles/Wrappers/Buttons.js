const { default: styled } = require('styled-components')

export const SimpleButton = styled.button`
  cursor: pointer;
  color: var(--white);
  background: var(--primary-5);
  border: transparent;
  border-radius: var(--radius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
  :hover {
    background: var(--primary-7);
    box-shadow: var(--shadow-5);
  }
`
// warning button

export const ButtonColor = styled(SimpleButton)`
  background-color: ${(props) =>
    props.color ? props.color : 'var(--primary)'};
`

//  shadow - outlined -
export const Button = styled.button`
  cursor: pointer;
  color: ${(props) => (props.outlined ? 'var(--primary)' : 'var(--white)')};
  background: ${(props) =>
    props.outlined ? 'transparent' : 'var(--primary-5)'};
  border: ${(props) =>
    props.outlined ? '2px solid var(--primary-5)' : 'transparent'};
  border-radius: var(--radius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
  box-shadow: ${(props) =>
    props.shadow ? 'var(--primary) 0px 0px 10px 1px' : ''};

  :hover {
    border: ${(props) =>
      props.outlined ? '2px solid var(--primary-7)' : 'transparent'};
    color: ${(props) => (props.outlined ? 'var(--white)' : 'var(--white)')};
    background: var(--primary-7);
    box-shadow: var(--shadow-3);
    box-shadow: ${(props) =>
      props.shadow ? 'var(--primary) 0px 0px 10px 1px' : ''};
  }
`
// loading button
