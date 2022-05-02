// See https://aka.ms/new-console-template for more information

using path_find;

List<List<int>> testArr = new List<List<int>>()
{
    new List<int>() {0, 0, 0, -1, -1},
    new List<int>() {0, 0, 0, -1, 0},
    new List<int>() {0, 0, 0, 0, 0},
    new List<int>() {-1, -1, 0, 0, 0},
    new List<int>() {-1, -1, 0, 0, 0}
};

var startDot = new Cord(0, 0, null);
var finishDot = new Cord(1, 4, null);

var path = new PathFind(testArr, startDot, finishDot).FindPath();

if (path.Count == 0)
{
    Console.WriteLine("No way");
}
else
{
    foreach(var el in path) {
        testArr[el.x][el.y] = 1;
    }

    foreach (var response in testArr.Select(line => line.Aggregate("[ ", (current, el) => current + el + ", ")).Select(response => response + " ]"))
    {
        Console.WriteLine(response);
    }
}