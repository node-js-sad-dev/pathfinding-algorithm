package path_find;

public class Cord {
    int x;
    int y;
    Cord prevCord;

    Cord(int x, int y, Cord cord) {
        this.x = x;
        this.y = y;
        this.prevCord = cord;
    }

    Cord(int x, int y) {
        this.x = x;
        this.y = y;
    }

    Cord(int x, int y, int prev_x, int prev_y) {
        this.x = x;
        this.y = y;
        this.prevCord = new Cord(prev_x, prev_y);
    }
}
