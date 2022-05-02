namespace path_find;

public class PathFind
{
    private List<List<int>> arr;

    private Cord _startDot;
    private Cord _finishDot;

    private static readonly List<int[]> Directions = new List<int[]>()
    {
        new int[2] { 0, 1 },
        new int[2] { 1, 0 },
        new int[2] { -1, 0 },
        new int[2] { 0, -1 }
    };

    private List<Cord> _reachable;
    private List<Cord> _explored;

    public PathFind(List<List<int>> arr, Cord startDot, Cord finishDot)
    {
        this.arr = arr;
        _startDot = startDot;
        _finishDot = finishDot;

        _reachable = new List<Cord>();
        _explored = new List<Cord>();

        _reachable.Add(_startDot);
    }

    private static bool IsCordInArr(Cord cord, List<Cord> arr)
    {
        foreach (var t in arr)
        {
            if (t.x == cord.x && t.y == cord.y)
            {
                return true;
            }
        }

        return false;
    }

    public List<Cord> FindPath()
    {
        while (_reachable.Count > 0)
        {
            var nextStep = _reachable[0];

            if (nextStep.x == _finishDot.x && nextStep.y == _finishDot.y)
            {
                _finishDot.prevCord = nextStep.prevCord;

                return BuildPath();
            }

            for (var i = 0; i < _reachable.Count; i++)
            {
                if (_reachable[i].x != nextStep.x || _reachable[i].y != nextStep.y) continue;
                _reachable.RemoveAt(i);

                break;
            }

            _explored.Add(nextStep);

            foreach (var direction in Directions)
            {
                var newX = nextStep.x + direction[0];
                var newY = nextStep.y + direction[1];

                if (newX >= 0 && newX < arr.Count && newY >= 0 && newY < arr[0].Count)
                {
                    var possibleMove = arr[newX][newY];

                    var newReachable = new Cord(newX, newY, nextStep);

                    var cordIsNotInReachable = !IsCordInArr(newReachable, _reachable);
                    var cordIsNotInExplored = !IsCordInArr(newReachable, _explored);
                    var isPossibleMove = possibleMove == 0;

                    if (cordIsNotInReachable && cordIsNotInExplored && isPossibleMove)
                    {
                        _reachable.Add(newReachable);
                    }
                }
            }
        }

        return new List<Cord>();
    }

    private List<Cord> BuildPath()
    {
        var path = new List<Cord>();

        var step = _finishDot;

        while (step.prevCord != null)
        {
            path.Add(step);

            step = step.prevCord;
        }

        path.Add(_startDot);

        path.Reverse();

        return path;
    }
}