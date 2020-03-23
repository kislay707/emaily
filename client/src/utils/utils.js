export const findXY = (i, count) => {
  let ratio = i / count;
  const y = Math.trunc(ratio);
  const x = i - y * count;
  return { x, y };
};

export const findIndex = (x, y, count) => {
  const result = y * count + x;
  return result;
};

const findXPlusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex + 1;
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (y != currentTileY) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findTopRightPlusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex + 1 - count;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (x <= currentTileX) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findBottRightPlusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex + 1 + count;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (x <= currentTileX) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findBottLeftPlusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex - 1 + count;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (x >= currentTileX) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findTopLeftPlusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex - 1 - count;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (x >= currentTileX) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findYPlusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex + count;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (x != currentTileX) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findXMinusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex - 1;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (y != currentTileY) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

const findYMinusTile = (currentTile, tiles, count) => {
  const currentTileX = currentTile.x;
  const currentTileY = currentTile.y;
  const currentTileIndex = findIndex(currentTileX, currentTileY, count);
  let result;
  var newTileIndex = currentTileIndex;
  while (true) {
    newTileIndex = newTileIndex - count;
    //console.log(newTileIndex);
    if (newTileIndex >= 0 && newTileIndex < tiles.length) {
      const { x, y } = findXY(newTileIndex, count);
      if (x != currentTileX) {
        break;
      } else if (tiles[newTileIndex].owner === -1) {
        continue;
      } else if (tiles[newTileIndex].owner != tiles[currentTileIndex].owner) {
        break;
      } else {
        result = newTileIndex;
        break;
      }
    } else {
      break;
    }
  }
  return result;
};

export const findList = (nextPlayer, tiles, count, currentAge) => {
  const ownerTiles = tiles.filter(tile => {
    return tile.owner === nextPlayer;
  });
  const newList = [];
  for (var i = 0; i < ownerTiles.length; i++) {
    var currentTile = ownerTiles[i];
    const xPlusTile = findXPlusTile(currentTile, tiles, count);
    const xMinusTile = findXMinusTile(currentTile, tiles, count);
    const yPlusTile = findYPlusTile(currentTile, tiles, count);
    const yMinusTile = findYMinusTile(currentTile, tiles, count);
    const topRightPlusTile = findTopRightPlusTile(currentTile, tiles, count);
    const bottRightPlusTile = findBottRightPlusTile(currentTile, tiles, count);
    const bottLeftPlusTile = findBottLeftPlusTile(currentTile, tiles, count);
    const topLeftPlusTile = findTopLeftPlusTile(currentTile, tiles, count);

    newList.push({
      xPlus: xPlusTile,
      yPlus: yPlusTile,
      xMinus: xMinusTile,
      yMinus: yMinusTile,
      topRightPlus: topRightPlusTile,
      bottRightPlus: bottRightPlusTile,
      bottLeftPlus: bottLeftPlusTile,
      topLeftPlus: topLeftPlusTile
    });
  }

  for (var i = 0; i < ownerTiles.length; i++) {
    let mainTile = ownerTiles[i];

    let tile1Index = newList[i].xPlus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.x - mainTile.x - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(mainTile, tile1, "xplus", tiles, nextPlayer, count);
      }
    }

    tile1Index = newList[i].xMinus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.x - mainTile.x - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(
          mainTile,
          tile1,
          "xminus",
          tiles,
          nextPlayer,
          count
        );
      }
    }

    tile1Index = newList[i].yPlus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.y - mainTile.y - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(mainTile, tile1, "yplus", tiles, nextPlayer, count);
      }
    }

    tile1Index = newList[i].yMinus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.y - mainTile.y - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(
          mainTile,
          tile1,
          "yminus",
          tiles,
          nextPlayer,
          count
        );
      }
    }

    tile1Index = newList[i].topRightPlus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.y - mainTile.y - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(
          mainTile,
          tile1,
          "topRight",
          tiles,
          nextPlayer,
          count
        );
      }
    }

    tile1Index = newList[i].bottRightPlus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.y - mainTile.y - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(
          mainTile,
          tile1,
          "bottomRight",
          tiles,
          nextPlayer,
          count
        );
      }
    }

    tile1Index = newList[i].bottLeftPlus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.y - mainTile.y - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(
          mainTile,
          tile1,
          "bottomLeft",
          tiles,
          nextPlayer,
          count
        );
      }
    }

    tile1Index = newList[i].topLeftPlus;
    if (tile1Index) {
      let tile1 = tiles[tile1Index];
      let greaterAge = Math.max(tile1.age, mainTile.age); // 1 , 10, 11,13, 15, 17
      let distance = Math.abs(tile1.y - mainTile.y - 1);
      if ((currentAge - greaterAge + 1) / 2 >= distance) {
        colorInbetweenTiles(
          mainTile,
          tile1,
          "topLeft",
          tiles,
          nextPlayer,
          count
        );
      }
    }
  }
};

const colorInbetweenTiles = (
  mainTile,
  tile1,
  pattern,
  tiles,
  nextPlayer,
  count
) => {
  const currentTileX = mainTile.x;
  const currentTileY = mainTile.y;
  const currentTileIndex = mainTile.index;
  var newTileIndex = currentTileIndex;
  if (pattern === "xplus") {
    while (true) {
      newTileIndex = newTileIndex + 1;
      //console.log(newTileIndex);
      if (newTileIndex >= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "yplus") {
    while (true) {
      newTileIndex = newTileIndex + count;
      //console.log(newTileIndex);
      if (newTileIndex >= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "xminus") {
    while (true) {
      newTileIndex = newTileIndex - 1;
      //console.log(newTileIndex);
      if (newTileIndex <= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "yminus") {
    while (true) {
      newTileIndex = newTileIndex - count;
      //console.log(newTileIndex);
      if (newTileIndex <= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "topRight") {
    while (true) {
      newTileIndex = newTileIndex + 1 - count;
      //console.log(newTileIndex);
      if (newTileIndex <= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "bottomRight") {
    while (true) {
      newTileIndex = newTileIndex + 1 + count;
      //console.log(newTileIndex);
      if (newTileIndex >= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "bottomLeft") {
    while (true) {
      newTileIndex = newTileIndex - 1 + count;
      //console.log(newTileIndex);
      if (newTileIndex >= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  } else if (pattern === "topLeft") {
    while (true) {
      newTileIndex = newTileIndex - 1 - count;
      //console.log(newTileIndex);
      if (newTileIndex <= tile1.index) {
        break;
      } else {
        tiles[newTileIndex].owner = nextPlayer;
      }
    }
  }
  //console.log("tiles is", tiles);
};
