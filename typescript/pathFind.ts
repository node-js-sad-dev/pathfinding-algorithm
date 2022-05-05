// alg A*

type T2DArr = Array<Array<0 | -1>>

type TCord = {
    x: number,
    y: number,
    previous: TCord | null
}

class PathFind_v1 {
    private arr: T2DArr;
    private startDot: TCord;
    private finishDot: TCord;

    private static directions = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1]
    ]

    private reachable: TCord[];
    private readonly explored: TCord[];

    constructor(arr: T2DArr, startDot: TCord, finishDot: TCord) {
        this.arr = arr;
        this.startDot = startDot;
        this.finishDot = finishDot;

        this.reachable = [this.startDot];

        this.explored = [];
    }

    private static isCordInArr(cord: TCord, arr: TCord[]): boolean {
        for (let el of arr) {
            if (el.x === cord.x && el.y === cord.y) {
                return true;
            }
        }

        return false;
    }

    public find_path(): TCord[] | false {
        while (this.reachable.length > 0) {
            let next_step = this.reachable[0];

            if (next_step.x === this.finishDot.x && next_step.y === this.finishDot.y) {
                this.finishDot.previous = next_step.previous;

                return this.build_path();
            }

            this.reachable = this.reachable.filter(el => el.x !== next_step.x && el.y !== next_step.y);
            this.explored.push(next_step);

            for (let direction of PathFind_v1.directions) {
                let newX = next_step.x + direction[0];
                let newY = next_step.y + direction[1];

                if (newX >= 0 && newX < this.arr.length && newY >= 0 && newY < this.arr[0].length) {
                    let possibleMove = this.arr[newX][newY];

                    console.log(newX, newY, possibleMove);

                    let newReachable = {
                        x: newX,
                        y: newY,
                        previous: next_step
                    }

                    let cordIsNotInReachable = !PathFind_v1.isCordInArr(newReachable, this.reachable);
                    let cordIsNotInExplored = !PathFind_v1.isCordInArr(newReachable, this.explored);
                    let isPossibleMove = possibleMove === 0;

                    if (cordIsNotInReachable && cordIsNotInExplored && isPossibleMove) {
                        this.reachable.push(newReachable)
                    }
                }
            }
        }

        return false;
    }

    private build_path(): TCord[] {
        let path = [];

        let step = this.finishDot;

        while (step.previous != null) {
            path.push(step);

            step = step.previous;
        }

        path.push(this.startDot);

        path = path.reverse();

        return path;
    }
}

let testArr: T2DArr = [
    [0, 0, 0, -1, -1],
    [0, 0, 0, -1, 0],
    [0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0],
    [-1, -1, 0, 0, 0]
];

let startDot: TCord = {
    x: 0,
    y: 0,
    previous: null
}

let finishDot: TCord = {
    x: 1,
    y: 4,
    previous: null
}

let path = new PathFind_v1(testArr, startDot, finishDot).find_path();

if (path) {
    let resultArr: Array<Array<string | number>> = testArr;
    let i = 1;
    for (let el of path) {
        resultArr[el.x][el.y] = i + '';
        i++;
    }

    console.log(resultArr.map(arr => {
        return arr.map(el => {
            return el >= 0 ? "____" + el : "___" + el
        })
    }))
}