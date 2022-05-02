package path_find;

import java.util.Arrays;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> testArr = new ArrayList<>();

        testArr.add(new ArrayList<>(Arrays.asList(0, 0, 0, -1, -1)));
        testArr.add(new ArrayList<>(Arrays.asList(0, 0, 0, -1, 0)));
        testArr.add(new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0)));
        testArr.add(new ArrayList<>(Arrays.asList(-1, -1, 0, 0, 0)));
        testArr.add(new ArrayList<>(Arrays.asList(-1, -1, 0, 0, 0)));

        Cord startDot = new Cord(0, 0, -1, -1);
        Cord finishDot = new Cord(1, 4, -1, -1);

        PathFind pathFind = new PathFind(testArr, startDot, finishDot);

        ArrayList<Cord> path = pathFind.findPath();

        if (path.isEmpty()) {
            System.out.println("No way to find path from dot to dot");
        } else {
            for (Cord el: path) {
                testArr.get(el.x).set(el.y, 1);
            }

            for (ArrayList<Integer> el: testArr) {
                System.out.println(el);
            }
        }
    }
}
