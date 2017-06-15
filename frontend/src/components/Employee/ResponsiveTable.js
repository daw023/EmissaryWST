/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import throttle from 'lodash/throttle';

const DEFAULT_ROW_HEIGHT = 50;
const DEFAULT_HEADER_HEIGHT = 50;
const DEFAULT_COLUMN_WIDTH = 1000;
const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 400;
const DEFAULT_ROW_COUNT = 0;


const TextCell = ({ rowIndex, data = {}, col, ...props }) => (
  <Cell {...props}>
    {(typeof data[rowIndex] !== 'undefined' || data[rowIndex] !== null)
      ? data[rowIndex][col]
      : ''
    }
  </Cell>
)

const containerId = 'ResponsiveTableContainer';

class ResponsiveTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    }
  }

  componentDidMount() {
    const { containerClassName } = this.props;
    console.log('containerClassName', containerClassName)
    const container = document.getElementsByClassName(containerClassName)[0];
    console.log('container.offsetWidth', container.offsetWidth)
    console.log('container.offsetHeight', container.offsetHeight)
    this.setState({width: container.offsetWidth, height: container.offsetHeight})
    this.oldWindowOnResize = window.onresize;
    window.onresize = () => {
      if (!!this.oldWindowOnResize) {
        this.oldWindowOnResize();
      }
      const ONE_TENTH_SECOND = 100;
      (throttle(() => {
        this.setState({width: container.offsetWidth, height: container.offsetHeight})
      }, ONE_TENTH_SECOND))();
    }
  }

  componentWillUnmount() {
    if (!!this.oldWindowOnResize) {
      window.onresize = this.oldWindowOnResize;
    }
  }


  render() {
    const {
      containerClassName,
      rows = [],
      headers = [],
      rowHeight = DEFAULT_ROW_HEIGHT,
      headerHeight = DEFAULT_HEADER_HEIGHT,
      columnWidth = DEFAULT_COLUMN_WIDTH,
    } = this.props;

    console.log('this.state responsive table', this.state)
    console.log('rows', rows);

    return (
      <div
        className={`relative`}
        id={containerId}
      >
        {rows.length === 0
          ? (
            <p
              style={{
                top: 62,
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                fontSize: 32,
                color: 'rgba(0,0,0,0.2)',
              }}
            >
              No Data Yet
            </p>
          )
          : null
        }
        <Table
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          rowsCount={!!rows.length ? rows.length : DEFAULT_ROW_COUNT}
          width={this.state.width}
          height={this.state.height}
          ref={() => {
            /*
            const node = document
              .querySelector('.fixedDataTableLayout_horizontalScrollbar');
            if (!node) return;
            node.parentNode.removeChild(node);
            */
          }}
        >
          {headers.map((h) => (
            <Column
              key={`Column-${h.display}`}
              header={<Cell>{h.display}</Cell>}
              cell={<TextCell data={rows} col={h.key} />}
              width={!!this.state.width
                ? (this.state.width / headers.length)
                : DEFAULT_COLUMN_WIDTH
              }
            />
          ))}
        </Table>

      </div>
    );
  }
}

export default ResponsiveTable;
