/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(9);
const Preload_1 = __webpack_require__(12);
const Menu_1 = __webpack_require__(10);
const Play_1 = __webpack_require__(11);
class SimpleGame extends Phaser.Game {
    constructor() {
        super(1000, 600, Phaser.CANVAS, "content", null);
        this.antialias = false;
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Menu', Menu_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
window.onload = () => {
    new SimpleGame();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
*   EasyStar.js
*   github.com/prettymuchbryce/EasyStarJS
*   Licensed under the MIT license.
*
*   Implementation By Bryce Neal (@prettymuchbryce)
**/

var EasyStar = {}
var Instance = __webpack_require__(2);
var Node = __webpack_require__(3);
var Heap = __webpack_require__(4);

const CLOSED_LIST = 0;
const OPEN_LIST = 1;

module.exports = EasyStar;

var nextInstanceId = 1;

EasyStar.js = function() {
    var STRAIGHT_COST = 1.0;
    var DIAGONAL_COST = 1.4;
    var syncEnabled = false;
    var pointsToAvoid = {};
    var collisionGrid;
    var costMap = {};
    var pointsToCost = {};
    var directionalConditions = {};
    var allowCornerCutting = true;
    var iterationsSoFar;
    var instances = {};
    var instanceQueue = [];
    var iterationsPerCalculation = Number.MAX_VALUE;
    var acceptableTiles;
    var diagonalsEnabled = false;

    /**
    * Sets the collision grid that EasyStar uses.
    *
    * @param {Array|Number} tiles An array of numbers that represent
    * which tiles in your grid should be considered
    * acceptable, or "walkable".
    **/
    this.setAcceptableTiles = function(tiles) {
        if (tiles instanceof Array) {
            // Array
            acceptableTiles = tiles;
        } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
            // Number
            acceptableTiles = [tiles];
        }
    };

    /**
    * Enables sync mode for this EasyStar instance..
    * if you're into that sort of thing.
    **/
    this.enableSync = function() {
        syncEnabled = true;
    };

    /**
    * Disables sync mode for this EasyStar instance.
    **/
    this.disableSync = function() {
        syncEnabled = false;
    };

    /**
     * Enable diagonal pathfinding.
     */
    this.enableDiagonals = function() {
        diagonalsEnabled = true;
    }

    /**
     * Disable diagonal pathfinding.
     */
    this.disableDiagonals = function() {
        diagonalsEnabled = false;
    }

    /**
    * Sets the collision grid that EasyStar uses.
    *
    * @param {Array} grid The collision grid that this EasyStar instance will read from.
    * This should be a 2D Array of Numbers.
    **/
    this.setGrid = function(grid) {
        collisionGrid = grid;

        //Setup cost map
        for (var y = 0; y < collisionGrid.length; y++) {
            for (var x = 0; x < collisionGrid[0].length; x++) {
                if (!costMap[collisionGrid[y][x]]) {
                    costMap[collisionGrid[y][x]] = 1
                }
            }
        }
    };

    /**
    * Sets the tile cost for a particular tile type.
    *
    * @param {Number} The tile type to set the cost for.
    * @param {Number} The multiplicative cost associated with the given tile.
    **/
    this.setTileCost = function(tileType, cost) {
        costMap[tileType] = cost;
    };

    /**
    * Sets the an additional cost for a particular point.
    * Overrides the cost from setTileCost.
    *
    * @param {Number} x The x value of the point to cost.
    * @param {Number} y The y value of the point to cost.
    * @param {Number} The multiplicative cost associated with the given point.
    **/
    this.setAdditionalPointCost = function(x, y, cost) {
        if (pointsToCost[y] === undefined) {
            pointsToCost[y] = {};
        }
        pointsToCost[y][x] = cost;
    };

    /**
    * Remove the additional cost for a particular point.
    *
    * @param {Number} x The x value of the point to stop costing.
    * @param {Number} y The y value of the point to stop costing.
    **/
    this.removeAdditionalPointCost = function(x, y) {
        if (pointsToCost[y] !== undefined) {
            delete pointsToCost[y][x];
        }
    }

    /**
    * Remove all additional point costs.
    **/
    this.removeAllAdditionalPointCosts = function() {
        pointsToCost = {};
    }

    /**
    * Sets a directional condition on a tile
    *
    * @param {Number} x The x value of the point.
    * @param {Number} y The y value of the point.
    * @param {Array.<String>} allowedDirections A list of all the allowed directions that can access
    * the tile.
    **/
    this.setDirectionalCondition = function(x, y, allowedDirections) {
        if (directionalConditions[y] === undefined) {
            directionalConditions[y] = {};
        }
        directionalConditions[y][x] = allowedDirections;
    };

    /**
    * Remove all directional conditions
    **/
    this.removeAllDirectionalConditions = function() {
        directionalConditions = {};
    };

    /**
    * Sets the number of search iterations per calculation.
    * A lower number provides a slower result, but more practical if you
    * have a large tile-map and don't want to block your thread while
    * finding a path.
    *
    * @param {Number} iterations The number of searches to prefrom per calculate() call.
    **/
    this.setIterationsPerCalculation = function(iterations) {
        iterationsPerCalculation = iterations;
    };

    /**
    * Avoid a particular point on the grid,
    * regardless of whether or not it is an acceptable tile.
    *
    * @param {Number} x The x value of the point to avoid.
    * @param {Number} y The y value of the point to avoid.
    **/
    this.avoidAdditionalPoint = function(x, y) {
        if (pointsToAvoid[y] === undefined) {
            pointsToAvoid[y] = {};
        }
        pointsToAvoid[y][x] = 1;
    };

    /**
    * Stop avoiding a particular point on the grid.
    *
    * @param {Number} x The x value of the point to stop avoiding.
    * @param {Number} y The y value of the point to stop avoiding.
    **/
    this.stopAvoidingAdditionalPoint = function(x, y) {
        if (pointsToAvoid[y] !== undefined) {
            delete pointsToAvoid[y][x];
        }
    };

    /**
    * Enables corner cutting in diagonal movement.
    **/
    this.enableCornerCutting = function() {
        allowCornerCutting = true;
    };

    /**
    * Disables corner cutting in diagonal movement.
    **/
    this.disableCornerCutting = function() {
        allowCornerCutting = false;
    };

    /**
    * Stop avoiding all additional points on the grid.
    **/
    this.stopAvoidingAllAdditionalPoints = function() {
        pointsToAvoid = {};
    };

    /**
    * Find a path.
    *
    * @param {Number} startX The X position of the starting point.
    * @param {Number} startY The Y position of the starting point.
    * @param {Number} endX The X position of the ending point.
    * @param {Number} endY The Y position of the ending point.
    * @param {Function} callback A function that is called when your path
    * is found, or no path is found.
    * @return {Number} A numeric, non-zero value which identifies the created instance. This value can be passed to cancelPath to cancel the path calculation.
    *
    **/
    this.findPath = function(startX, startY, endX, endY, callback) {
        // Wraps the callback for sync vs async logic
        var callbackWrapper = function(result) {
            if (syncEnabled) {
                callback(result);
            } else {
                setTimeout(function() {
                    callback(result);
                });
            }
        }

        // No acceptable tiles were set
        if (acceptableTiles === undefined) {
            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
        }
        // No grid was set
        if (collisionGrid === undefined) {
            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
        }

        // Start or endpoint outside of scope.
        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 ||
        startX > collisionGrid[0].length-1 || startY > collisionGrid.length-1 ||
        endX > collisionGrid[0].length-1 || endY > collisionGrid.length-1) {
            throw new Error("Your start or end point is outside the scope of your grid.");
        }

        // Start and end are the same tile.
        if (startX===endX && startY===endY) {
            callbackWrapper([]);
            return;
        }

        // End point is not an acceptable tile.
        var endTile = collisionGrid[endY][endX];
        var isAcceptable = false;
        for (var i = 0; i < acceptableTiles.length; i++) {
            if (endTile === acceptableTiles[i]) {
                isAcceptable = true;
                break;
            }
        }

        if (isAcceptable === false) {
            callbackWrapper(null);
            return;
        }

        // Create the instance
        var instance = new Instance();
        instance.openList = new Heap(function(nodeA, nodeB) {
            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
        });
        instance.isDoneCalculating = false;
        instance.nodeHash = {};
        instance.startX = startX;
        instance.startY = startY;
        instance.endX = endX;
        instance.endY = endY;
        instance.callback = callbackWrapper;

        instance.openList.push(coordinateToNode(instance, instance.startX,
            instance.startY, null, STRAIGHT_COST));

        var instanceId = nextInstanceId ++;
        instances[instanceId] = instance;
        instanceQueue.push(instanceId);
        return instanceId;
    };

    /**
     * Cancel a path calculation.
     *
     * @param {Number} instanceId The instance ID of the path being calculated
     * @return {Boolean} True if an instance was found and cancelled.
     *
     **/
    this.cancelPath = function(instanceId) {
        if (instanceId in instances) {
            delete instances[instanceId];
            // No need to remove it from instanceQueue
            return true;
        }
        return false;
    };

    /**
    * This method steps through the A* Algorithm in an attempt to
    * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
    * You can change the number of calculations done in a call by using
    * easystar.setIteratonsPerCalculation().
    **/
    this.calculate = function() {
        if (instanceQueue.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
            return;
        }
        for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
            if (instanceQueue.length === 0) {
                return;
            }

            if (syncEnabled) {
                // If this is a sync instance, we want to make sure that it calculates synchronously.
                iterationsSoFar = 0;
            }

            var instanceId = instanceQueue[0];
            var instance = instances[instanceId];
            if (typeof instance == 'undefined') {
                // This instance was cancelled
                instanceQueue.shift();
                continue;
            }

            // Couldn't find a path.
            if (instance.openList.size() === 0) {
                instance.callback(null);
                delete instances[instanceId];
                instanceQueue.shift();
                continue;
            }

            var searchNode = instance.openList.pop();

            // Handles the case where we have found the destination
            if (instance.endX === searchNode.x && instance.endY === searchNode.y) {
                var path = [];
                path.push({x: searchNode.x, y: searchNode.y});
                var parent = searchNode.parent;
                while (parent!=null) {
                    path.push({x: parent.x, y:parent.y});
                    parent = parent.parent;
                }
                path.reverse();
                var ip = path;
                instance.callback(ip);
                delete instances[instanceId];
                instanceQueue.shift();
                continue;
            }

            searchNode.list = CLOSED_LIST;

            if (searchNode.y > 0) {
                checkAdjacentNode(instance, searchNode,
                    0, -1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y-1));
            }
            if (searchNode.x < collisionGrid[0].length-1) {
                checkAdjacentNode(instance, searchNode,
                    1, 0, STRAIGHT_COST * getTileCost(searchNode.x+1, searchNode.y));
            }
            if (searchNode.y < collisionGrid.length-1) {
                checkAdjacentNode(instance, searchNode,
                    0, 1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y+1));
            }
            if (searchNode.x > 0) {
                checkAdjacentNode(instance, searchNode,
                    -1, 0, STRAIGHT_COST * getTileCost(searchNode.x-1, searchNode.y));
            }
            if (diagonalsEnabled) {
                if (searchNode.x > 0 && searchNode.y > 0) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            -1, -1, DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y-1));
                    }
                }
                if (searchNode.x < collisionGrid[0].length-1 && searchNode.y < collisionGrid.length-1) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            1, 1, DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y+1));
                    }
                }
                if (searchNode.x < collisionGrid[0].length-1 && searchNode.y > 0) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            1, -1, DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y-1));
                    }
                }
                if (searchNode.x > 0 && searchNode.y < collisionGrid.length-1) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) {

                        checkAdjacentNode(instance, searchNode,
                            -1, 1, DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y+1));
                    }
                }
            }

        }
    };

    // Private methods follow
    var checkAdjacentNode = function(instance, searchNode, x, y, cost) {
        var adjacentCoordinateX = searchNode.x+x;
        var adjacentCoordinateY = searchNode.y+y;

        if ((pointsToAvoid[adjacentCoordinateY] === undefined ||
             pointsToAvoid[adjacentCoordinateY][adjacentCoordinateX] === undefined) &&
            isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
            var node = coordinateToNode(instance, adjacentCoordinateX,
                adjacentCoordinateY, searchNode, cost);

            if (node.list === undefined) {
                node.list = OPEN_LIST;
                instance.openList.push(node);
            } else if (searchNode.costSoFar + cost < node.costSoFar) {
                node.costSoFar = searchNode.costSoFar + cost;
                node.parent = searchNode;
                instance.openList.updateItem(node);
            }
        }
    };

    // Helpers
    var isTileWalkable = function(collisionGrid, acceptableTiles, x, y, sourceNode) {
        var directionalCondition = directionalConditions[y] && directionalConditions[y][x];
        if (directionalCondition) {
            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y)
            var directionIncluded = function () {
                for (var i = 0; i < directionalCondition.length; i++) {
                    if (directionalCondition[i] === direction) return true
                }
                return false
            }
            if (!directionIncluded()) return false
        }
        for (var i = 0; i < acceptableTiles.length; i++) {
            if (collisionGrid[y][x] === acceptableTiles[i]) {
                return true;
            }
        }

        return false;
    };

    /**
     * -1, -1 | 0, -1  | 1, -1
     * -1,  0 | SOURCE | 1,  0
     * -1,  1 | 0,  1  | 1,  1
     */
    var calculateDirection = function (diffX, diffY) {
        if (diffX === 0 && diffY === -1) return EasyStar.TOP
        else if (diffX === 1 && diffY === -1) return EasyStar.TOP_RIGHT
        else if (diffX === 1 && diffY === 0) return EasyStar.RIGHT
        else if (diffX === 1 && diffY === 1) return EasyStar.BOTTOM_RIGHT
        else if (diffX === 0 && diffY === 1) return EasyStar.BOTTOM
        else if (diffX === -1 && diffY === 1) return EasyStar.BOTTOM_LEFT
        else if (diffX === -1 && diffY === 0) return EasyStar.LEFT
        else if (diffX === -1 && diffY === -1) return EasyStar.TOP_LEFT
        throw new Error('These differences are not valid: ' + diffX + ', ' + diffY)
    };

    var getTileCost = function(x, y) {
        return (pointsToCost[y] && pointsToCost[y][x]) || costMap[collisionGrid[y][x]]
    };

    var coordinateToNode = function(instance, x, y, parent, cost) {
        if (instance.nodeHash[y] !== undefined) {
            if (instance.nodeHash[y][x] !== undefined) {
                return instance.nodeHash[y][x];
            }
        } else {
            instance.nodeHash[y] = {};
        }
        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
        if (parent!==null) {
            var costSoFar = parent.costSoFar + cost;
        } else {
            costSoFar = 0;
        }
        var node = new Node(parent,x,y,costSoFar,simpleDistanceToTarget);
        instance.nodeHash[y][x] = node;
        return node;
    };

    var getDistance = function(x1,y1,x2,y2) {
        if (diagonalsEnabled) {
            // Octile distance
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            if (dx < dy) {
                return DIAGONAL_COST * dx + dy;
            } else {
                return DIAGONAL_COST * dy + dx;
            }
        } else {
            // Manhattan distance
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            return (dx + dy);
        }
    };
}

EasyStar.TOP = 'TOP'
EasyStar.TOP_RIGHT = 'TOP_RIGHT'
EasyStar.RIGHT = 'RIGHT'
EasyStar.BOTTOM_RIGHT = 'BOTTOM_RIGHT'
EasyStar.BOTTOM = 'BOTTOM'
EasyStar.BOTTOM_LEFT = 'BOTTOM_LEFT'
EasyStar.LEFT = 'LEFT'
EasyStar.TOP_LEFT = 'TOP_LEFT'


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
module.exports = function() {
    this.pointsToAvoid = {};
    this.startX;
    this.callback;
    this.startY;
    this.endX;
    this.endY;
    this.nodeHash = {};
    this.openList;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
* A simple Node that represents a single tile on the grid.
* @param {Object} parent The parent node.
* @param {Number} x The x position on the grid.
* @param {Number} y The y position on the grid.
* @param {Number} costSoFar How far this node is in moves*cost from the start.
* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
**/
module.exports = function(parent, x, y, costSoFar, simpleDistanceToTarget) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.costSoFar = costSoFar;
    this.simpleDistanceToTarget = simpleDistanceToTarget;

    /**
    * @return {Number} Best guess distance of a cost using this node.
    **/
    this.bestGuessDistance = function() {
        return this.costSoFar + this.simpleDistanceToTarget;
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
      return module.exports = factory();
    } else {
      return root.Heap = factory();
    }
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Hero {
    constructor(game, key, position) {
        this.game = game;
        this.key = key;
        this.sprite = this.game.add.sprite(position.x, position.y, this.key);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.fixedRotation = true;
        this.frameRate = 5;
        this.sprite.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
        this.sprite.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
        this.sprite.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
        this.sprite.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.set(1);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.body.setCircle(20, 0, 0);
        this.isDead = false;
        this.isSafe = false;
    }
    play() {
        this.move(this.game.cursors);
        this.update(this.game.zombies, this.game.victims);
    }
    move(cursors) {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        if (cursors.left.isDown) {
            this.sprite.body.velocity.x = -200;
            this.sprite.animations.play('walk-left');
        }
        else if (cursors.right.isDown) {
            this.sprite.body.velocity.x = 200;
            this.sprite.animations.play('walk-right');
        }
        else if (cursors.up.isDown) {
            this.sprite.body.velocity.y = -200;
            this.sprite.animations.play('walk-up');
        }
        else if (cursors.down.isDown) {
            this.sprite.body.velocity.y = 200;
            this.sprite.animations.play('walk-down');
        }
        if (this.game.exitX <= this.sprite.x) {
            this.isSafe = true;
            this.stop();
        }
    }
    update(zombies, victims) {
        this.game.physics.arcade.collide(this.sprite, this.game.layer);
        var zombieSprites = [];
        for (var i = 0; i < zombies.length; i++) {
            zombieSprites.push(zombies[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, zombieSprites, this.eaten, null, this);
        var victimSprites = [];
        for (var i = 0; i < victims.length; i++) {
            victimSprites.push(victims[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, victimSprites);
    }
    destroy() {
        this.sprite.destroy();
    }
    eaten(victim) {
        if (this.isDead == false) {
            var dieSprite = this.game.add.sprite(this.sprite.x - this.sprite.width, this.sprite.y - this.sprite.height, 'explode');
            dieSprite.animations.add('eaten');
            dieSprite.animations.play('eaten', 20, false, true);
            var explodeAudio = this.game.add.audio('explosion');
            explodeAudio.play();
            //dieSprite.animations.currentAnim.onComplete.add(function () {	console.log('animation complete');}, this);
            this.isDead = true;
        }
    }
    stop() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
    }
}
exports.default = Hero;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Victim {
    constructor(game, key, position) {
        this.YELL = 'yell';
        this.EATEN = 'eaten';
        this.FOLLOW = 'follow';
        this.game = game;
        this.key = key;
        this.sprite = this.game.add.sprite(position.x, position.y, this.key);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.fixedRotation = true;
        this.frameRate = 5;
        this.sprite.animations.add('waiting', [1], this.frameRate, true);
        this.sprite.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
        this.sprite.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
        this.sprite.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
        this.sprite.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.set(1);
        this.sprite.body.mass = 10;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.body.setCircle(20, 0, 0);
        this.YELL = 'yell';
        this.EATEN = 'eaten';
        this.FOLLOW = 'follow';
        this.state = this.YELL;
        this.isDead = false;
        this.speed = 50;
        this.visibilityScope = 300;
        this.speakTimer = 0;
        var style = { font: "bold 18px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "center", boundsAlignV: "middle" };
        this.speakText = this.game.add.text(this.sprite.x, this.sprite.y - 20, 'Help!', style);
        this.speakText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.astarTimer = 0;
    }
    play() {
        this.move(this.game.hero);
        this.update(this.game.zombies, this.game.victims);
    }
    move(hero) {
        var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
        var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);
        if (diffX < this.visibilityScope && diffY < this.visibilityScope) {
            this.state = this.FOLLOW;
        }
        else if (diffX > 1000) {
            this.state = this.YELL;
            this.sprite.animations.play('waiting');
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
        if (this.state == this.FOLLOW) {
            this.findNextDirection(hero);
        }
    }
    update(zombies, victims) {
        this.game.physics.arcade.collide(this.sprite, this.game.layer);
        var zombieSprites = [];
        for (var i = 0; i < zombies.length; i++) {
            zombieSprites.push(zombies[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, zombieSprites, this.eaten, null, this);
        var victimSprites = [];
        for (var i = 0; i < victims.length; i++) {
            victimSprites.push(victims[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, victimSprites);
        if (this.state == this.YELL) {
            this.speakText.setText('Help!');
        }
        else if (this.state == this.FOLLOW) {
            this.speakText.setText('Follow!');
        }
        else if (this.state == this.EATEN) {
            this.speakText.setText('Argghh!');
        }
        this.speakTimer += this.game.time.elapsed;
        var blinkTiming = 2000;
        if (this.speakTimer >= blinkTiming) {
            this.speakTimer -= blinkTiming;
            var verticalTween = this.game.add.tween(this.speakText).to({ y: this.sprite.y - 40 }, 700, Phaser.Easing.Linear.None, true);
            verticalTween.onComplete.add(function () {
                this.speakText.y = this.sprite.y - 20;
            }, this);
            var fadingTween = this.game.add.tween(this.speakText).to({ alpha: 0 }, 700, Phaser.Easing.Linear.None, true);
            fadingTween.onComplete.add(function () {
                this.speakText.alpha = 1;
            }, this);
        }
        else {
            this.speakText.x = this.sprite.x;
            this.speakText.y = this.sprite.y - 20;
        }
    }
    destroy() {
        this.sprite.destroy();
        this.speakText.destroy();
    }
    eaten(victim) {
        this.state = this.EATEN;
        if (this.isDead == false) {
            var dieSprite = this.game.add.sprite(this.sprite.x - this.sprite.width, this.sprite.y - this.sprite.height, 'explode');
            dieSprite.animations.add('eaten');
            dieSprite.animations.play('eaten', 20, false, true);
            var explodeAudio = this.game.add.audio('explosion');
            explodeAudio.play();
            //dieSprite.animations.currentAnim.onComplete.add(function () {	console.log('animation complete');}, this);
            this.isDead = true;
        }
    }
    findNextDirection(target) {
        this.astarTimer += this.game.time.elapsed;
        var astarTiming = 1000;
        if (this.astarTimer >= astarTiming) {
            this.astarTimer -= astarTiming;
            var myTile = this.game.map.getTileWorldXY(this.sprite.x, this.sprite.y);
            var targetTile = this.game.map.getTileWorldXY(target.sprite.x, target.sprite.y);
            var mysprite = this.sprite;
            var myspeed = this.speed;
            this.game.easystar.findPath(myTile.x, myTile.y, targetTile.x, targetTile.y, function (path) {
                if (path === null) {
                    console.log("The path to the destination point was not found.");
                }
                else {
                    if (path[1].y < myTile.y) {
                        mysprite.body.velocity.y = myspeed * -1;
                    }
                    else {
                        mysprite.body.velocity.y = myspeed;
                    }
                    if (path[1].x < myTile.x) {
                        mysprite.body.velocity.x = myspeed * -1;
                    }
                    else {
                        mysprite.body.velocity.x = myspeed;
                    }
                    var diffY = Math.abs(path[1].y - targetTile.y);
                    var diffX = Math.abs(path[1].x - targetTile.x);
                    if (diffY >= diffX) {
                        if (path[1].y < myTile.y) {
                            mysprite.animations.play('walk-up');
                        }
                        else {
                            mysprite.animations.play('walk-down');
                        }
                    }
                    else {
                        if (path[1].x < myTile.x) {
                            mysprite.animations.play('walk-left');
                        }
                        else {
                            mysprite.animations.play('walk-right');
                        }
                    }
                }
            });
            this.game.easystar.calculate();
        }
    }
}
exports.default = Victim;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Zombie {
    constructor(game, key, position) {
        this.WAIT = 'wait';
        this.HUNT = 'hunt';
        this.game = game;
        this.key = key;
        this.sprite = this.game.add.sprite(position.x, position.y, this.key);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.fixedRotation = true;
        this.frameRate = 5;
        this.sprite.animations.add('wait', [1], this.frameRate, true);
        this.sprite.animations.add('walk-down', [0, 1, 2], this.frameRate, true);
        this.sprite.animations.add('walk-right', [3, 4, 5], this.frameRate, true);
        this.sprite.animations.add('walk-up', [6, 7, 8], this.frameRate, true);
        this.sprite.animations.add('walk-left', [9, 10, 11], this.frameRate, true);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.set(1);
        this.sprite.body.mass = 10;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.body.setCircle(20, 0, 0);
        this.WAIT = 'wait';
        this.HUNT = 'hunt';
        this.state = this.WAIT;
        this.target = null;
        this.visibilityScope = 300;
        this.astarTimer = 0;
        this.speed = 20;
    }
    play() {
        this.move(this.game.hero, this.game.victims);
        this.update(this.game.zombies);
    }
    move(hero, victims) {
        var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
        var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);
        if ((diffX > this.visibilityScope || diffY > this.visibilityScope) && this.state != this.HUNT) {
            this.state = this.WAIT;
            this.sprite.animations.play('wait');
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
        else if (diffX > 1000) {
            this.state = this.WAIT;
            this.sprite.animations.play('wait');
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
        else {
            this.state = this.HUNT;
            this.chooseTarget(hero, victims);
            this.findNextDirection(this.target);
        }
    }
    chooseTarget(hero, victims) {
        this.target = hero;
        var diffY = Math.abs(hero.sprite.body.y - this.sprite.body.y);
        var diffX = Math.abs(hero.sprite.body.x - this.sprite.body.x);
        for (var i = 0; i < victims.length; i++) {
            var victim = victims[i];
            var newDiffY = Math.abs(victim.sprite.body.y - this.sprite.body.y);
            var newDiffX = Math.abs(victim.sprite.body.x - this.sprite.body.x);
            if (newDiffY < diffY && newDiffX < diffX) {
                this.target = victim;
                diffX = newDiffX;
                diffY = newDiffY;
            }
        }
    }
    update(zombies) {
        this.game.physics.arcade.collide(this.sprite, this.game.layer);
        var zombieSprites = [];
        for (var i = 0; i < zombies.length; i++) {
            zombieSprites.push(zombies[i].sprite);
        }
        this.game.physics.arcade.collide(this.sprite, zombieSprites);
    }
    destroy() {
        this.sprite.destroy();
    }
    findNextDirection(target) {
        this.astarTimer += this.game.time.elapsed;
        var astarTiming = 1000;
        if (this.astarTimer >= astarTiming) {
            this.astarTimer -= astarTiming;
            var myTile = this.game.map.getTileWorldXY(this.sprite.x, this.sprite.y);
            var targetTile = this.game.map.getTileWorldXY(target.sprite.x, target.sprite.y);
            var mysprite = this.sprite;
            var myspeed = this.speed;
            this.game.easystar.findPath(myTile.x, myTile.y, targetTile.x, targetTile.y, function (path) {
                if (path === null) {
                    console.log("The path to the destination point was not found.");
                }
                else {
                    if (path[1].y < myTile.y) {
                        mysprite.body.velocity.y = myspeed * -1;
                    }
                    else {
                        mysprite.body.velocity.y = myspeed;
                    }
                    if (path[1].x < myTile.x) {
                        mysprite.body.velocity.x = myspeed * -1;
                    }
                    else {
                        mysprite.body.velocity.x = myspeed;
                    }
                    var diffY = Math.abs(path[1].y - targetTile.y);
                    var diffX = Math.abs(path[1].x - targetTile.x);
                    if (diffY >= diffX) {
                        if (path[1].y < myTile.y) {
                            mysprite.animations.play('walk-up');
                        }
                        else {
                            mysprite.animations.play('walk-down');
                        }
                    }
                    else {
                        if (path[1].x < myTile.x) {
                            mysprite.animations.play('walk-left');
                        }
                        else {
                            mysprite.animations.play('walk-right');
                        }
                    }
                }
            });
            this.game.easystar.calculate();
        }
    }
}
exports.default = Zombie;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Boot extends Phaser.State {
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('Preload');
    }
}
exports.default = Boot;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Menu extends Phaser.State {
    constructor() {
        super(...arguments);
        this.epicAudio = null;
        this.writtenAudio = null;
        this.titleText = null;
        this.playText = null;
    }
    create() {
        this.epicAudio = this.game.add.audio('menu-epic');
        this.writtenAudio = this.game.add.audio('sketching');
        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.
        this.game.sound.setDecodedCallback([this.epicAudio, this.writtenAudio], this.animateBriefing, this);
    }
    shutdown() {
        this.writtenAudio.stop();
        this.epicAudio.stop();
        this.epicAudio.destroy();
        this.writtenAudio.destroy();
        this.titleText.destroy();
        this.playText.destroy();
        this.epicAudio = null;
        this.writtenAudio = null;
        this.titleText = null;
        this.playText = null;
    }
    animateBriefing() {
        this.game.stage.backgroundColor = '#182d3b';
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);
        this.epicAudio.play();
        this.titleText = this.game.add.text(100, 0, 'Fast Food!', this.getFontStyle(60));
        this.addGradient(this.titleText);
        this.game.add.existing(this.titleText);
        var bounceTitle = this.game.add.tween(this.titleText).to({ y: 150 }, 2400, Phaser.Easing.Bounce.Out, true);
        this.playText = this.game.add.text(150, 250, '', this.getFontStyle(30));
        this.addGradient(this.playText);
        this.playText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.playText.setTextBounds(0, 0, 100, 100);
        this.playText.wordWrapWidth = 10;
        this.game.add.existing(this.playText);
        this.game.add.tween(bounceTitle).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None);
        bounceTitle.onComplete.add(function () {
            this.writtenAudio.loopFull();
            var content = 'You wake up in a crazy area infested by explosive zombies,\nat the end of the timer, the army will destroy the area...\nClick on space to play!';
            var letterIndex = 0;
            this.game.time.events.repeat(70, content.length, function () {
                this.playText.text = this.playText.text + content[letterIndex];
                letterIndex++;
                if (letterIndex == content.length) {
                    this.writtenAudio.stop();
                }
            }, this);
        }, this);
    }
    startGame() {
        this.game.state.start('Play');
    }
    getFontStyle(fontSize) {
        return { font: fontSize + "px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "left", boundsAlignV: "top" };
    }
    addGradient(text) {
        var gradient = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        gradient.addColorStop(0, '#F77B7B');
        gradient.addColorStop(1, '#870505');
        text.fill = gradient;
    }
}
exports.default = Menu;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EasyStar = __webpack_require__(1);
const Hero_1 = __webpack_require__(6);
const Zombie_1 = __webpack_require__(8);
const Victim_1 = __webpack_require__(7);
class Play extends Phaser.State {
    constructor() {
        super(...arguments);
        this.debug = false;
    }
    create() {
        this.map = null;
        this.layer = null;
        this.hero = null;
        this.startX = null;
        this.startY = null;
        this.zombies = [];
        this.victims = [];
        this.exitX = 9300;
        this.cursors = null;
        this.frameRate = 5;
        this.mainText = null;
        this.easystar = null;
        this.wallIndexes = [
            1, 2, 3,
            9, 10, 11,
            17, 18, 19, 20, 21,
            25, 26, 27, 28, 29,
            33, 34, 35, 36, 37,
            41, 42, 43, 44, 45
        ];
        this.shakesCount = null;
        this.timerText = null;
        this.levelTime = null;
        this.remainingTime = null;
        this.timer = null;
        this.timerEvent = null;
        this.levelTime = 120;
        this.remainingTime = this.levelTime;
        this.shakesCount = 0;
        this.playCountdown = false;
        this.playExplosion = false;
        this.game.time.advancedTiming = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('Desert');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();
        if (this.debug) {
            this.layer.debug = true;
        }
        this.map.setCollision(this.wallIndexes);
        var characters = this.map.objects['Characters'];
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].type == 'zombie') {
                this.zombies.push(new Zombie_1.default(this, characters[i].name, { x: characters[i].x, y: characters[i].y }));
            }
            else if (characters[i].type == 'victim') {
                this.victims.push(new Victim_1.default(this, characters[i].name, { x: characters[i].x, y: characters[i].y }));
            }
            else if (characters[i].type == 'hero') {
                this.startX = characters[i].x;
                this.startY = characters[i].y;
                this.hero = new Hero_1.default(this, characters[i].name, { x: this.startX, y: this.startY });
            }
            else {
                console.error(characters[i]);
            }
        }
        this.camera.follow(this.hero.sprite);
        this.easystar = new EasyStar.js();
        var grid = [];
        var tileRows = this.map.layer.data;
        for (var y = 0; y < tileRows.length; y++) {
            grid[y] = [];
            for (var x = 0; x < tileRows[y].length; x++) {
                if (this.wallIndexes.indexOf(tileRows[y][x].index) == -1) {
                    grid[y][x] = 0;
                }
                else {
                    grid[y][x] = 1;
                }
            }
        }
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableDiagonals();
        this.timer = this.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.levelTime, this.endTimer, this);
        this.timer.start();
        this.timerText = this.add.text(this.camera.x, this.camera.y, '', this.getFontStyle(32));
        this.timerText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.timerText.setTextBounds(10, 10, 800, 100);
        this.timerText.fixedToCamera = true;
        this.mainText = this.game.add.text(0, 0, '', this.getFontStyle(32));
        this.mainText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.mainText.setTextBounds(250, 220, 800, 100);
        this.mainText.fixedToCamera = true;
        var zombieAudios = [
            this.game.add.audio('brains1'),
            this.game.add.audio('brains2'),
            this.game.add.audio('brains3'),
            this.game.add.audio('crackly_groan'),
            this.game.add.audio('creak1'),
            this.game.add.audio('creak2'),
            this.game.add.audio('creak3'),
            this.game.add.audio('creak4'),
            this.game.add.audio('creak5'),
            this.game.add.audio('creak6'),
            this.game.add.audio('creak7'),
        ];
        this.game.time.events.loop(1500, function () {
            var zombieAudio = zombieAudios[Math.floor(Math.random() * zombieAudios.length)];
            zombieAudio.play();
        }, this);
        this.countdownAudio = this.game.add.audio('countdown');
    }
    update() {
        if (this.hero.isSafe == true) {
            this.displayMessage('Congratz! Out of hell!!!', 0);
            this.timer.add(Phaser.Timer.SECOND * 3, this.openMenu, this);
            return;
        }
        if (this.hero.isDead == true) {
            this.transformHeroToZombie();
            return;
        }
        this.hero.play();
        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].play();
        }
        for (var i = 0; i < this.victims.length; i++) {
            if (this.victims[i].isDead == false) {
                this.victims[i].play();
            }
            else {
                this.transformVictimToZombie(this.victims[i]);
                this.victims.splice(i, 1);
            }
        }
        this.updateCamera();
        if (this.timer.running) {
            this.remainingTime = Math.round((this.timerEvent.delay - this.timer.ms) / 1000);
            this.timerText.setText(this.formatTime(this.remainingTime));
            if (this.remainingTime == 20 && this.playCountdown == false) {
                this.playCountdown = true;
                this.countdownAudio.play();
            }
            else if (this.remainingTime < 2 && this.playExplosion == false) {
                this.playExplosion = true;
                this.shakeCamera(20);
                this.finalSprite = this.game.add.sprite(this.hero.sprite.x, this.hero.sprite.y, 'finalexplosion');
                this.finalSprite.anchor.setTo(0.5);
                this.finalSprite.scale.setTo(4, 4);
                this.finalSprite.animations.add('explosion');
                this.finalSprite.animations.play('explosion', 20);
                this.timer.add(Phaser.Timer.SECOND * 1, this.openMenu, this);
            }
        }
    }
    render() {
        if (this.debug) {
            const fps = this.time.fps ? this.time.fps.toString() : '--';
            this.game.debug.text(fps, 2, 14, "#00ff00");
            this.game.debug.body(this.hero.sprite);
        }
    }
    shutdown() {
        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].destroy();
        }
        for (var i = 0; i < this.victims.length; i++) {
            this.victims[i].destroy();
        }
        this.hero.destroy();
        this.victims = [];
        this.zombies = [];
        this.hero = null;
        if (this.playCountdown) {
            this.countdownAudio.stop();
        }
    }
    getFontStyle(fontSize) {
        return { font: fontSize + "px FeastOfFlesh", fill: "#ff0044", boundsAlignH: "left", boundsAlignV: "top" };
    }
    endTimer() {
        this.timer.stop();
    }
    formatTime(s) {
        const min = Math.floor(s / 60);
        const sec = s - min * 60;
        const minutes = "0" + min;
        const seconds = "0" + sec;
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    transformVictimToZombie(victim) {
        var zombieSpriteKey = 'zombie' + victim.sprite.key.slice(-1);
        var newZombie = new Zombie_1.default(this, zombieSpriteKey, { x: victim.sprite.x, y: victim.sprite.y });
        newZombie.state = newZombie.HUNT;
        this.zombies.push(newZombie);
        this.displayMessage('Eaten, one more Zombie! Run! Run!', 2000);
        victim.destroy();
        this.shakeCamera(20);
    }
    transformHeroToZombie() {
        var zombieSpriteKey = 'zombie' + this.hero.sprite.key.slice(-1);
        var newZombie = new Zombie_1.default(this, zombieSpriteKey, { x: this.hero.sprite.x, y: this.hero.sprite.y });
        newZombie.state = newZombie.HUNT;
        this.zombies.push(newZombie);
        this.displayMessage('You\'re now one of us ...', 2000);
        this.hero.destroy();
        this.shakeCamera(20);
        this.timer.add(Phaser.Timer.SECOND * 2, this.openMenu, this);
    }
    openMenu() {
        this.game.state.start('Menu');
    }
    displayMessage(content, time) {
        this.mainText.setText(content);
        this.game.time.events.add(time, function () { this.setText(''); }, this.mainText);
    }
    shakeCamera(count) {
        this.shakesCount = count;
    }
    updateCamera() {
        if (this.shakesCount > 0) {
            this.camera.unfollow();
            var sens = this.shakesCount * 0.5;
            var shakeX = 10;
            if (this.shakesCount % 2) {
                this.camera.x += shakeX ? sens : 0;
            }
            else {
                this.camera.x -= shakeX ? sens : 0;
            }
            this.shakesCount--;
        }
        else {
            this.camera.follow(this.hero.sprite);
        }
    }
}
exports.default = Play;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Preload extends Phaser.State {
    preload() {
        // thanks K. Macleod at http://incompetech.com/
        this.load.audio('menu-epic', 'assets/audio/Dangerous.mp3');
        // thanks netgfx for https://github.com/netgfx/Phaser-typewriter
        this.load.audio('sketching', 'assets/audio/pencilsketching.mp3');
        // thanks http://phaser.io/examples/v2/games/invaders
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
        // thanks bart http://opengameart.org/content/25-spooky-sound-effects
        this.load.audio('brains1', 'assets/audio/spookysounds/brains.wav');
        this.load.audio('brains2', 'assets/audio/spookysounds/brains2.wav');
        this.load.audio('brains3', 'assets/audio/spookysounds/brains3.wav');
        this.load.audio('crackly_groan', 'assets/audio/spookysounds/crackly_groan.wav');
        this.load.audio('creak1', 'assets/audio/spookysounds/creak1.wav');
        this.load.audio('creak2', 'assets/audio/spookysounds/creak2.wav');
        this.load.audio('creak3', 'assets/audio/spookysounds/creak3.wav');
        this.load.audio('creak4', 'assets/audio/spookysounds/creak4.wav');
        this.load.audio('creak5', 'assets/audio/spookysounds/creak5.wav');
        this.load.audio('creak6', 'assets/audio/spookysounds/creak6.wav');
        this.load.audio('creak7', 'assets/audio/spookysounds/creak7.wav');
        // thanks Russintheus http://www.freesound.org/people/Russintheus/sounds/165089/#
        this.load.audio('countdown', 'assets/audio/165089__russintheus__countdown-boom.mp3');
        // thanks Curt http://opengameart.org/content/zombie-rpg-sprites
        this.load.spritesheet('zombie1', 'assets/sprites/Zombie1.png', 40, 40, 12);
        this.load.spritesheet('zombie2', 'assets/sprites/Zombie2.png', 40, 40, 12);
        this.load.spritesheet('zombie3', 'assets/sprites/Zombie3.png', 40, 40, 12);
        this.load.spritesheet('zombie4', 'assets/sprites/Zombie4.png', 40, 40, 12);
        this.load.spritesheet('zombie5', 'assets/sprites/Zombie5.png', 40, 40, 12);
        this.load.spritesheet('zombie6', 'assets/sprites/Zombie6.png', 40, 40, 12);
        this.load.spritesheet('zombie7', 'assets/sprites/Zombie7.png', 64, 64, 12);
        this.load.spritesheet('victim1', 'assets/sprites/Victim1.png', 40, 40, 12);
        this.load.spritesheet('victim2', 'assets/sprites/Victim2.png', 40, 40, 12);
        this.load.spritesheet('victim3', 'assets/sprites/Victim3.png', 40, 40, 12);
        this.load.spritesheet('victim4', 'assets/sprites/Victim4.png', 40, 40, 12);
        this.load.spritesheet('victim5', 'assets/sprites/Victim5.png', 40, 40, 12);
        this.load.spritesheet('victim6', 'assets/sprites/Victim6.png', 40, 40, 12);
        this.load.spritesheet('explode', 'assets/sprites/explode.png', 128, 128);
        // thanks http://rswhite.de/dgame5/?page=tutorial&tut=spritesheets
        this.load.spritesheet('finalexplosion', 'assets/sprites/final-explosion.png', 256, 256);
        this.load.image('Desert', 'assets/tilemaps/tiles/Desert.png');
        this.load.tilemap('map', "assets/tilemaps/maps/level1.json", null, Phaser.Tilemap.TILED_JSON);
    }
    create() {
        this.game.state.start('Menu');
    }
}
exports.default = Preload;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);