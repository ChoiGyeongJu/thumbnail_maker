import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrap>
      <a href="https://github.com/ChoiGyeongJu" target="_blank" rel="noreferrer">
        Github
      </a>
      <span>gyeongju5142@gmail.com</span>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.footer`
  color: white;
  width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
  padding: 60px 0;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
`;
