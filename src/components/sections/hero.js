import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Typed from 'typed.js';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 799px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    display: inline-block;
    border-radius: var(--border-radius);
    transition: var(--transition);
    border-radius: 20px;
    &:hover,
    &:focus,
    &:active {
      background-color: var(--lightest-navy);
      color: var(--green);
      outline: none;
    }
  }

  .auto-type {
    visibility: visible;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const typedElementRef = useRef(null);
  const typedInstance = useRef(null); // Keep track of Typed.js instance

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const initializeTyped = () => {
    if (typedElementRef.current) {
      const options = {
        strings: [
          'create web services.',
          'was SDE Intern at Motorola.',
          'am a Developer.',
          'am in my Final year of UG at Manipal.',
          'design interactive websites.',
          'am a Problem Solver.',
          'am Batman (...maybe? 😛)',
        ],
        typeSpeed: 125,
        backSpeed: 100,
        loop: true,
      };

      console.log('Initializing Typed.js');
      typedInstance.current = new Typed(typedElementRef.current, options);
    }
  };

  useEffect(() => {
    if (!prefersReducedMotion && isMounted) {
      initializeTyped();
    }

    return () => {
      if (typedInstance.current) {
        console.log('Destroying Typed.js');
        typedInstance.current.destroy();
      }
    };
  }, [isMounted, prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Surya Kiran.</h2>;
  const three = (
    <h3 className="big-heading">
      I{' '}
      <span ref={typedElementRef} className="auto-type">
        create web services.
      </span>
    </h3>
  );
  const four = (
    <>
      <p>
        I'm a Software Engineer from India who loves to build stuff that interacts with data and the
        internet. <br />
        Pursuing Bachelor's in Computer Science and Engineering from{' '}
        <a href="https://manipal.edu/" target="_blank" rel="noreferrer">
          Manipal Institute of Technology
        </a>
        . <br />
        Ex - Engineering Intern @{' '}
        <a href="https://motorolasolutions.com/" target="_blank" rel="noreferrer">
          Motorola
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/suryak15/"
      target="_blank"
      rel="noreferrer"
    >
      Connect with Me!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
