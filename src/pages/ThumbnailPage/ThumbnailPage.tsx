import { ChangeEvent, useEffect, useRef, useState } from 'react';

import html2canvas from 'html2canvas';

import { Button } from '@mui/material';
import styled from 'styled-components';

import { generateColor, generatePastelColor } from '$utils/index';

interface TextStyle {
  isWhite: boolean;
  isShadow: boolean;
  isSmall: boolean;
}

const ThumbnailPage = () => {
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [sortTitle, setSortTitle] = useState<string>('');

  const [layoutMode, setLayoutMode] = useState<'full' | 'part' | 'title'>('full');

  const [bgImage, setBgImage] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('');
  const [textStyle, setTextStyle] = useState<TextStyle>({
    isWhite: false,
    isShadow: false,
    isSmall: false,
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'title' | 'subTitle' | 'sortTitle'
  ) => {
    const value = e.target.value;

    switch (type) {
      case 'title':
        setTitle(value);
        break;
      case 'subTitle':
        setSubTitle(value);
        break;
      case 'sortTitle':
        setSortTitle(value);
        break;
    }
  };

  const handleClickPastel = () => {
    setBgImage('');
    const color1 = generatePastelColor();
    const color2 = generatePastelColor();
    setBgColor(`linear-gradient(to bottom, ${color1}, ${color2})`);
  };

  const handleClickColor = () => {
    setBgImage('');
    const color = generateColor();
    setBgColor(color);
  };

  const handleClickTextShadow = () => {
    setTextStyle(prev => ({ ...prev, isShadow: !prev.isShadow }));
  };

  const handleClickTextColor = () => {
    setTextStyle(prev => ({ ...prev, isWhite: !prev.isWhite }));
  };

  const handleClickTextSize = () => {
    setTextStyle(prev => ({ ...prev, isSmall: !prev.isSmall }));
  };

  const handleCapture = () => {
    const imageWrapper = document.getElementById('thumbnail');
    if (imageWrapper) {
      html2canvas(imageWrapper).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'thumbnail.png';
        link.click();
      });
    }
  };

  // 초기 렌더링 시 배경색 설정
  useEffect(() => {
    handleClickColor();
  }, []);
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.style.background = bgColor;
  }, [bgColor]);

  return (
    <Wrapper>
      <HeaderTitle>Thumanil Maker</HeaderTitle>
      <ImageWrapper
        id="thumbnail"
        textStyle={textStyle}
        style={{ background: bgImage ? `url(${bgImage}) center / cover no-repeat` : bgColor }}
      >
        <div className="title">{title ? title : '제목을 입력해주세요'}</div>
        {layoutMode === 'full' && (
          <div className="sub-title">{subTitle ? subTitle : '부제목을 입력해주세요'}</div>
        )}
        {layoutMode !== 'title' && (
          <div className="sort-title">{sortTitle ? sortTitle : '분류를 입력해주세요'}</div>
        )}
      </ImageWrapper>
      <TextField>
        <StyledInput
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'title')}
          placeholder="제목을 입력해주세요"
        />
        <StyledInput
          value={subTitle}
          disabled={layoutMode !== 'full'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'subTitle')}
          placeholder="부제목을 입력해주세요"
        />
        <StyledInput
          value={sortTitle}
          disabled={layoutMode === 'title'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'sortTitle')}
          placeholder="분류를 입력해주세요"
        />
      </TextField>

      <SettingWrapper>
        <span>배경</span>
        <Controller>
          <StyledButton onClick={handleClickPastel}>랜덤 파스텔</StyledButton>
          <StyledButton onClick={handleClickColor}>랜덤 단색</StyledButton>
          <StyledButton onClick={() => imageRef?.current?.click()}>
            이미지 업로드
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </StyledButton>
        </Controller>
      </SettingWrapper>
      <SettingWrapper>
        <span>구성 요소</span>
        <Controller>
          <StyledButton onClick={() => setLayoutMode('full')}>제목/부제/분류</StyledButton>
          <StyledButton onClick={() => setLayoutMode('part')}>제목/분류</StyledButton>
          <StyledButton onClick={() => setLayoutMode('title')}>제목</StyledButton>
        </Controller>
      </SettingWrapper>
      <SettingWrapper>
        <span>텍스트</span>
        <Controller>
          <StyledButton onClick={handleClickTextColor}>색상 반전</StyledButton>
          <StyledButton onClick={handleClickTextShadow}>그림자</StyledButton>
          <StyledButton onClick={handleClickTextSize}>글자 크기</StyledButton>
        </Controller>
      </SettingWrapper>
      <ButtonWrapper>
        <Button variant="outlined">초기화</Button>
        <Button onClick={handleCapture} variant="contained" color="primary">
          저장
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ThumbnailPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1024px;
  height: 1200px;
  padding: 0 120px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const HeaderTitle = styled.p`
  font-size: 54px;
  font-weight: 700;
`;

const ImageWrapper = styled.div<{ textStyle: TextStyle }>`
  width: 800px;
  height: 420px;
  user-select: none;
  & div {
    text-shadow: ${props => (props.textStyle.isShadow ? 'rgba(0, 0, 0, 0.4) 2px 2px 4px' : 'none')};
    color: ${props => (props.textStyle.isWhite ? 'white' : 'black')};
  }
  & .title {
    position: relative;
    display: block;
    top: 140px;
    font-size: ${props => (props.textStyle.isSmall ? '46px' : '54px')};
  }
  & .sub-title {
    width: fit-content;
    border-top: 1px solid ${props => (props.textStyle.isWhite ? 'white' : 'black')};
    font-size: ${props => (props.textStyle.isSmall ? '22px' : '24px')};
    position: relative;
    display: inline-block;
    top: 150px;
  }
  & .sort-title {
    font-size: ${props => (props.textStyle.isSmall ? '22px' : '24px')};
    position: relative;
    top: 240px;
  }
`;

const TextField = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  padding: 36px 0;
  border-bottom: 1px solid lightgray;
`;

const StyledInput = styled.input`
  width: 240px;
  height: 40px;
  border: 1px solid #cacaca;
  border-radius: 14px;
  padding-left: 12px;
`;

const SettingWrapper = styled.div`
  width: 800px;
  height: 70px;
  user-select: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const Controller = styled.div`
  width: 650px;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 20px;
  border: none;
  &:hover {
    filter: brightness(90%);
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  gap: 36px;
  & button {
    width: 120px;
    height: 60px;
    font-size: 20px;
    border-radius: 20px;
  }
`;
