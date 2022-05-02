package path_find;

import java.util.ArrayList;

public class PathFind {
    private final ArrayList<ArrayList<Integer>> arr;
    private final Cord startDot;
    private final Cord finishDot;

    private static final int[][] directions = {
            {0, 1},
            {1, 0},
            {-1, 0},
            {0, -1}
    };

    private final ArrayList<Cord> reachable;
    private final ArrayList<Cord> explored;

    PathFind(ArrayList<ArrayList<Integer>> arr, Cord startDot, Cord finishDot) {
        this.arr = arr;
        this.startDot = startDot;
        this.finishDot = finishDot;

        this.reachable = new ArrayList<>();
        this.reachable.add(this.startDot);

        this.explored = new ArrayList<>();
    }

    public ArrayList<Cord> findPath() {
        while (!this.reachable.isEmpty()) {
            Cord next_step = this.reachable.get(0);

            if (next_step.x == this.finishDot.x && next_step.y == this.finishDot.y) {
                this.finishDot.prevCord = next_step.prevCord;

                return this.buildPath();
            }

            // remove from reachable next_step
            for (int i = 0; i < this.reachable.size(); i++) {
                Cord iterable = this.reachable.get(i);

                if (iterable.x == next_step.x && iterable.y == next_step.y) {
                    this.reachable.remove(i);
                    break;
                }
            }

            //add to explored arr
            this.explored.add(next_step);

            for (int[] direction : directions) {
                int newX = next_step.x + direction[0];
                int newY = next_step.y + direction[1];

                if (newX >= 0 && newX < this.arr.size() && newY >= 0 && newY < this.arr.get(0).size()) {
                    int possibleMove = this.arr.get(newX).get(newY);

                    Cord newReachable = new Cord(newX, newY, next_step);

                    boolean cordIsNotInReachable = PathFind.cordIsNotInArr(newReachable, this.reachable);
                    boolean cordIsNotInExplored = PathFind.cordIsNotInArr(newReachable, this.explored);
                    boolean isPossibleMove = possibleMove == 0;

                    if (cordIsNotInReachable && cordIsNotInExplored && isPossibleMove) {
                        this.reachable.add(newReachable);
                    }
                }
            }
        }

        return new ArrayList<>();
    }

    private static boolean cordIsNotInArr(Cord cord, ArrayList<Cord> arr) {
        if (!arr.isEmpty()) {
            for (Cord value : arr) {
                if (value.x == cord.x && value.y == cord.y) {
                    return false;
                }
            }
        }

        return true;
    }

    private ArrayList<Cord> buildPath() {
        ArrayList<Cord> path = new ArrayList<>();

        Cord step = this.finishDot;

        while (step.prevCord.x != -1 && step.prevCord.y != -1) {
            path.add(step);

            step = step.prevCord;
        }

        path.add(this.startDot);

        // reverse array list
        ArrayList<Cord> reversedPath = new ArrayList<>();

        for (int i = path.size() - 1; i >= 0; i--) {

            // Append the elements in reverse order
            reversedPath.add(path.get(i));
        }

        return reversedPath;
    }
}
