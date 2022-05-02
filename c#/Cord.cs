namespace path_find;

public class Cord
{
    public int x;
    public int y;

    public Cord? prevCord;

    public Cord(int x, int y, Cord? prevCord)
    {
        this.x = x;
        this.y = y;
        this.prevCord = prevCord;
    }
}