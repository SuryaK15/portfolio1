import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '✰';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-m);
        line-height: 14px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 350px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: 20px;
    z-index: 100;
    box-shadow: 10px 10px 10px rgba(255, 226, 226, 0.3);
    cursor: pointer;

    &:hover,
    &:focus {
      outline: 0;
      box-shadow: 10px 10px 10px rgba(255, 226, 226, 0.3);

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: 15px;
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Java',
    'Python',
    'Linux',
    'MySQL',
    'PySpark',
    'Hadoop',
    'Grafana',
    'Graphite QL',
    'Docker',
    'React',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello, my name is Surya and I'm a Software Engineer based in India. I spend my time
              building beautiful products, learning new stuff.
            </p>

            <p>
              Fast-forward to today, Currently I am in my 4<sup>th</sup> year of Bachelor's and I’ve
              had the privilege of interning at{' '}
              <a href="https://motorolasolutions.com/">Motorola Solutions</a>,{' '}
              <a href="https://jindalsteelpower.com/">Jindal Steel and Power</a>,{' '}
              <a href="https://www.bostonindia.in/">Boston IT</a>, and{' '}
              <a href="https://www.khelgully.com">a start-up</a>. My main focus these days is
              observing and learning all new kinds of tech-stack.
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
