import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import githubTheme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { hexToRgb } from '@gympass/yoga-common';
import { MDXContext } from '@mdx-js/react';

import * as YogaComponents from '@gympass/yoga';
import PrismHighlight from '../PrismHighlight';

import CodeToolbar from './CodeToolbar';
import CodeBlockContext from '../CodeBlockContext';
import Clipboard from '../../Clipboard';

const CodeError = styled(LiveError)`
  background-color: #fff0f0;
  color: #ff4249;
  margin: 0;
  padding: 15px 15px 4px;
`;

const Preview = styled.div`
  ${({
    theme: {
      yoga: {
        colors: { white, elements },
      },
    },
  }) => `
    background-color: ${white};
    border-radius: 5px;
    border: 1px solid ${elements.lineAndBorders};

    textarea {
      outline: none;
    }
  `};
`;

const Component = styled.div`
  ${({
    'data-center': center,
    darkMode,
    theme: {
      yoga: {
        colors: { white, text, primary },
      },
    },
  }) => `
    font-family: 'Rubik';
    padding: 50px;
    background-color: ${darkMode ? text.primary : white};
    transition: all 0.3s ease-in-out;

    ${YogaComponents.Col} {
      background-color: ${hexToRgb(primary, 0.5)};
      border: 1px solid;
      color: ${white};
    }

    > div {
      width: 100%;
      ${
        center
          ? `
      align-items: center;
      display: flex;
      justify-content: center;
    `
          : ''
      }
    }

    @media (max-width: 900px) {
      padding: 20px;
    }
  `}
`;

const Usage = styled.div`
  ${({
    visible,
    theme: {
      yoga: {
        colors: { white },
      },
    },
  }) => `
    background-color: ${white};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: ${visible ? 'block' : 'none'};
    padding: 1px;

    pre {
      border: 0;
    }
  `};
`;

const ReactLive = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const codeblockData = useContext(CodeBlockContext);
  const { imports, code, center, state } = codeblockData;

  Object.assign(codeblockData, {
    codeVisible,
    setCodeVisible,
    darkMode,
    setDarkMode,
  });

  return (
    <MDXContext.Consumer>
      {(scope) => (
        <LiveProvider
          code={code}
          scope={{ ...scope, useState, styled }}
          theme={githubTheme}
          noInline={state}
        >
          <Preview>
            <CodeToolbar />

            <Component data-center={center} darkMode={darkMode}>
              <LivePreview />
            </Component>

            <Usage visible={codeVisible}>
              {imports && (
                <YogaComponents.Box position="relative">
                  <Clipboard copyText={imports + code} />
                  <PrismHighlight code={imports} liveEditor={false} />
                </YogaComponents.Box>
              )}
              <PrismHighlight code={code} liveEditor />
              <CodeError />
            </Usage>
          </Preview>
        </LiveProvider>
      )}
    </MDXContext.Consumer>
  );
};

export default ReactLive;
