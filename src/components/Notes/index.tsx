import React, { CSSProperties, PureComponent, ReactNode } from 'react';
import { Text } from 'components';
import './index.scss';

import { v4 } from 'uuid';
import classNames from 'classnames';
import { updateArray } from 'lib';

import { BlockInterface } from 'interfaces';
import { CurrentType } from 'types';

import { selectStyle } from './selectors';
import { TEXT } from './const';

interface NotesProps {
  className: string,
  style: CSSProperties,
  width: number | string,
  height: number | string,
};

class Notes extends PureComponent {
  state = {
    blocks: [],
    current: null,
  };

  componentDidMount(): void {
    return this.addBlock();
  };

  // blocks

  addBlock = () => {
    const uuid = v4();
    return this.setState(prevState => ({
      ...prevState,
      blocks: [...prevState.blocks, { ...TEXT, uuid }],
      current: uuid
    }));
  };

  changeBlock = (block: BlockInterface) =>
    this.setState(prevState => ({ ...prevState, blocks: updateArray(prevState.blocks, block) }));

  deleteBlock = (block: BlockInterface) => {
    const { blocks } = this.state;
    const index = blocks.findIndex(b => b.uuid === block.uuid);
    if (index === 0) {
      return;
    };
    return this.setState({
      blocks: updateArray(blocks, block, { mode: 'delete' }),
      current: blocks[index - 1]?.uuid
    });
  };

  // position

  setCurrent = (current: CurrentType) =>
    this.setState({ current });

  // render

  renderBlock = (block: BlockInterface, index: number) => {
    const { current } = this.state;
    const props = {
      key: block.uuid,
      index,
      block,
      current,
      setCurrent: this.setCurrent,
      onAdd: this.addBlock,
      onChange: this.changeBlock,
      onDelete: this.deleteBlock,
    };
    switch (block.type) {
      case 'text':
        return <Text {...props} />;
      default:
        return null;
    }
  };

  render(): ReactNode {
    const { className }: NotesProps = this.props;
    const { blocks } = this.state;

    return (
      <div
        className={classNames('app-notes', className)}
        style={selectStyle(this.props)}
        contentEditable
      >
        {blocks.map(this.renderBlock)}
      </div>
    );
  };
};

export default Notes;