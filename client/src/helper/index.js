import { Component } from "react";

var rotateLeft = function (matrix) {
  var rows = matrix.length;
  var columns = matrix[0].length;
  var res = [];
  for (var row = 0; row < rows; ++row) {
    res.push([]);
    for (var column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
};

class Tile {
  constructor(value, row, column) {
    this.value = value || 0;
    this.row = row || -1;
    this.column = column || -1;
    this.oldRow = -1;
    this.oldColumn = -1;
    this.markForDeletion = false;
    this.mergedInto = null;
    this.id = this.id++ || 0;
  }

  moveTo(row, column) {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
  }
  
  isNew() {
    return this.oldRow === -1 && !this.mergedInto;
  }
  hasMoved() {
    return (
      (this.fromRow() !== -1 &&
        (this.fromRow() !== this.toRow() ||
          this.fromColumn() !== this.toColumn())) ||
      this.mergedInto
    );
  }
  fromRow() {
    return this.mergedInto ? this.row : this.oldRow;
  }
  fromColumn() {
    return this.mergedInto ? this.column : this.oldColumn;
  }
  toRow() {
    return this.mergedInto ? this.mergedInto.row : this.row;
  }
  toColumn() {
    return this.mergedInto ? this.mergedInto.column : this.column;
  }
}

class Board  extends Component {

  constructor(props) { 
    super(props); 

    this.tiles = [];
    this.cells = [];
    this.score = this.props?.score || 0;
    this.mine_coins = this.props?.mine_coins || 0;
    this.size = 4;
    this.fourProbability = 0.1;
    this.deltaX = [-1, 0, 1, 0];
    this.deltaY = [0, -1, 0, 1];
  
    for (var i = 0; i < this.size; ++i) {  
      this.cells[i] = [ 
        this.addTile(),
        this.addTile(),
        this.addTile(),
        this.addTile(),
      ];  
    } 
    if(this.props.cells == undefined) { 
      this.addRandomTile();
      this.addRandomTile();
    }
    this.setPositions(); 
     
    if(this.props.cells !== undefined) { 
      for (var l = 0; l < this.size; ++l) {
        this.cells[l].map((elem,k) => {
          elem.value = this.props.cells[l][k].value
          elem.row = this.props.cells[l][k].row
          elem.column = this.props.cells[l][k].column
          elem.oldRow = this.props.cells[l][k].oldRow
          elem.oldColumn = this.props.cells[l][k].oldColumn 
          return false;
        }) 
      }   
 
      this.props.tiles.map((elem,a) => {
        elem.value = this.props.tiles[a].value
        elem.row = this.props.tiles[a].row
        elem.column = this.props.tiles[a].column
        elem.oldRow = this.props.tiles[a].oldRow
        elem.oldColumn = this.props.tiles[a].oldColumn 
        return false;
      })  
 
    }

    this.won = false; 
  }

  addTile(args) { 
    var res = new Tile(args);   
    this.tiles.push(res); 
    return res;
  }

  moveLeft() {
    var hasChanged = false;
    for (var row = 0; row < this.size; ++row) {
      var currentRow = this.cells[row].filter((tile) => tile.value !== 0);
      var resultRow = [];
      for (var target = 0; target < this.size; ++target) {
        var targetTile = currentRow.length
          ? currentRow.shift()
          : this.addTile(); 
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          var tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          var tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value; 
          this.score += tile1.value + tile2.value;  
          this.mine_coins += (this.props.miningInfo.tile_price) * tile1.value; 
        }
        resultRow[target] = targetTile;
        this.won |= targetTile.value === 2048;
        hasChanged |= targetTile.value !== this.cells[row][target].value;
      }
      this.cells[row] = resultRow;
    }
    return hasChanged;
  }

  setPositions() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  }

  addRandomTile() {
    var emptyCells = [];
    for (var r = 0; r < this.size; ++r) {
      for (var c = 0; c < this.size; ++c) {
        if (this.cells[r][c].value === 0) {
          emptyCells.push({ r: r, c: c });
        }
      }
    }
    var index = ~~(Math.random() * emptyCells.length);
    var cell = emptyCells[index];
    var newValue = Math.random() < this.fourProbability ? 4 : 2;
    this.cells[cell.r][cell.c] = this.addTile(newValue);
  }

  move(direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down 
 
    this.clearOldTiles(); 
    for (var i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    var hasChanged = this.moveLeft();
    for (let i = direction; i < 4; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    if (hasChanged) {
      this.addRandomTile();
    }
    this.setPositions();
    return this;
  }

  clearOldTiles() { 
    this.tiles = this.tiles.filter((tile) =>  tile.markForDeletion === false );  
    this.tiles.forEach((tile) => {  
      tile.markForDeletion = true;
    });
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => { 
        tile.markForDeletion = true;
      });
    });
  }

  hasWon() {
    return this.won;
  }

  hasLost() {
    var canMove = false;
    if(this.cells.length > 0) {
      for (var row = 0; row < this.size; ++row) {
        for (var column = 0; column < this.size; ++column) {
          canMove |= this.cells[row][column].value === 0;
          for (var dir = 0; dir < 4; ++dir) {
            var newRow = row + this.deltaX[dir];
            var newColumn = column + this.deltaY[dir];
            if (
              newRow < 0 ||
              newRow >= this.size ||
              newColumn < 0 ||
              newColumn >= this.size
            ) {
              continue;
            }
            canMove |=
              this.cells[row][column].value ===
              this.cells[newRow][newColumn].value;
          }
        }
      } 
    } else {
      canMove = true
    }
    return !canMove;
  }
}

export { Board, Tile };
