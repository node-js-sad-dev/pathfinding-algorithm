// alg A*
var PathFind_v2 = /** @class */ (function () {
    function PathFind_v2(arr, startDot, finishDot) {
        this.arr = arr;
        this.startDot = startDot;
        this.finishDot = finishDot;
        this.reachable = [this.startDot];
        this.explored = [];
    }
    PathFind_v2.isCordInArr = function (cord, arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var el = arr_1[_i];
            if (el.x === cord.x && el.y === cord.y) {
                return true;
            }
        }
        return false;
    };
    PathFind_v2.prototype.calculateDistance = function (cord) {
        return Math.sqrt(Math.pow((this.finishDot.x - cord.x), 2) + Math.pow((this.finishDot.y - cord.y), 2));
    };
    PathFind_v2.prototype.selectBestReachable = function () {
        /*
            First we need to check if reachable length === 1 then just return it
            then we need for every reachable find distance to finish
            and select it as optimal
         */
        var minDist = this.calculateDistance(this.reachable[0]);
        var optimalCord = this.reachable[0];
        for (var _i = 0, _a = this.reachable; _i < _a.length; _i++) {
            var el = _a[_i];
            var elDistanceToFinish = this.calculateDistance(el);
            if (elDistanceToFinish < minDist) {
                minDist = elDistanceToFinish;
                optimalCord = el;
            }
        }
        return optimalCord;
    };
    PathFind_v2.prototype.find_path = function () {
        var _loop_1 = function () {
            var next_step = this_1.selectBestReachable();
            if (next_step.x === this_1.finishDot.x && next_step.y === this_1.finishDot.y) {
                this_1.finishDot.previous = next_step.previous;
                return { value: this_1.build_path() };
            }
            this_1.reachable = this_1.reachable.filter(function (el) { return el.x !== next_step.x && el.y !== next_step.y; });
            this_1.explored.push(next_step);
            for (var _i = 0, _a = PathFind_v2.directions; _i < _a.length; _i++) {
                var direction = _a[_i];
                var newX = next_step.x + direction.x;
                var newY = next_step.y + direction.y;
                if (newX >= 0 && newX < this_1.arr.length && newY >= 0 && newY < this_1.arr[0].length) {
                    var possibleMove = this_1.arr[newX][newY];
                    var newReachable = {
                        x: newX,
                        y: newY,
                        previous: next_step
                    };
                    // with 4 additional directions we need to check them to avoid situations when dot will move through the wall
                    var cordIsNotInReachable = !PathFind_v2.isCordInArr(newReachable, this_1.reachable);
                    var cordIsNotInExplored = !PathFind_v2.isCordInArr(newReachable, this_1.explored);
                    var isPossibleMove = possibleMove === 0;
                    if (cordIsNotInReachable && cordIsNotInExplored && isPossibleMove) {
                        if (direction.additionalCheck) {
                            var firstDirectionIsNotAWall = this_1.arr[next_step.x + direction.additionalCheck[0].x][next_step.y + direction.additionalCheck[0].y] === 0;
                            var secondDirectionIsNotAWall = this_1.arr[next_step.x + direction.additionalCheck[1].x][next_step.y + direction.additionalCheck[1].y] === 0;
                            if (firstDirectionIsNotAWall || secondDirectionIsNotAWall)
                                this_1.reachable.push(newReachable);
                        }
                        else {
                            this_1.reachable.push(newReachable);
                        }
                    }
                }
            }
        };
        var this_1 = this;
        while (this.reachable.length > 0) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    PathFind_v2.prototype.build_path = function () {
        var path = [];
        var step = this.finishDot;
        while (step.previous != null) {
            path.push(step);
            step = step.previous;
        }
        path.push(this.startDot);
        path = path.reverse();
        return path;
    };
    PathFind_v2.directions = [
        {
            x: -1, y: 1,
            additionalCheck: [
                { x: -1, y: 0 },
                { x: 0, y: 1 }
            ]
        },
        { x: 0, y: 1 },
        {
            x: 1, y: 1,
            additionalCheck: [
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ]
        },
        { x: 1, y: 0 },
        {
            x: 1, y: -1,
            additionalCheck: [
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ]
        },
        { x: 0, y: -1 },
        {
            x: -1, y: -1,
            additionalCheck: [
                { x: 0, y: -1 },
                { x: -1, y: 0 }
            ]
        },
        { x: -1, y: 0 }
    ];
    return PathFind_v2;
}());
