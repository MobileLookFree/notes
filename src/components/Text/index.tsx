import React, { useRef, useCallback, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import './index.scss';

import { BlockInterface } from 'interfaces';
import { setCaretEnd } from 'lib';

interface TextProps {
  index: number,
  current: null | string,
  setCurrent: (uuid: null | string) => void,
  block: { uuid: string, type: string, data: string },
  onAdd: () => void,
  onChange: (block: BlockInterface) => void,
  onDelete: (block: BlockInterface) => void,
};

const Text = ({
  block,
  current, setCurrent,
  onAdd, onChange, onDelete }: TextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { uuid, data } = block;

  const setInnerHTML = useCallback(() => {
    if (ref?.current) {
      ref.current.innerHTML = data;
    };
  }, [ref, block]);

  const handleFocus = useCallback(() => {
    setCurrent(uuid);
  }, [setCurrent]);

  const handleBlur = useCallback(event => {
    setCurrent(null);
    onChange({
      ...block,
      data: sanitizeHtml(event.currentTarget.innerHTML, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: { 'a': ['href'] },
      })
    });
  }, [setCurrent, onChange]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleBlur(event);
      onAdd();
    };
    if (event.key === 'Backspace' && !event.currentTarget.innerText) {
      event.preventDefault();
      onDelete(block);
    };
  }, [block, onDelete]);

  useEffect(() => {
    if (ref?.current) {
      setInnerHTML();
      if (current === uuid) {
        setCaretEnd(ref.current);
      };
    };
  }, [ref, current, block, setInnerHTML]);

  return (
    <div
      ref={ref}
      className='app-text'
      contentEditable
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

Text.defaultProps = {
  block: {}
};

export default Text;