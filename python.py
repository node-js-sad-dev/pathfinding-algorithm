def is_cord_in_arr(cord, arr):
    for cord in arr:
        if cord['x'] == cord['x'] and cord['y'] == cord['y']:
            return True

    return False


class PathFindV1:
    """Find path from one dot to another on 2d surface"""
    directions = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1]
    ]

    def __init__(self, arr, start_dot, finish_dot):
        self.arr = arr
        self.start_dot = start_dot
        self.finish_dot = finish_dot

        self.start_dot['previous'] = None
        self.finish_dot['previous'] = None

        self.reachable = [self.start_dot]
        self.explored = []

    def find_path(self):
        while len(self.reachable) > 0:
            step = self.reachable[0]

            if step['x'] == self.finish_dot['x'] and step['y'] == self.finish_dot['y']:
                self.finish_dot['previous'] = step['previous']

                return self.build_path()

            self.reachable = list(filter(lambda i: i['x'] != step['x'] and i['y'] != step['y'], self.reachable))
            self.explored.append(step)

            for direction in self.directions:
                new_x = step['x'] + direction[0]
                new_y = step['y'] + direction[1]

                if 0 <= new_x < len(self.arr) and 0 <= new_y < len(self.arr[0]):
                    possible_move = self.arr[new_x][new_y]

                    new_reachable = {
                        'x': new_x,
                        'y': new_y,
                        'previous': step
                    }

                    cord_is_not_in_reachable = is_cord_in_arr(new_reachable, self.reachable) == False
                    cord_is_not_in_explored = is_cord_in_arr(new_reachable, self.explored) == False
                    is_possible_move = possible_move == 0
                    if cord_is_not_in_explored and cord_is_not_in_reachable and is_possible_move:
                        self.reachable.append(new_reachable)

        return False

    def build_path(self):
        path = []

        step = self.finish_dot

        while step['previous'] is not None:
            path.append(step)

            step = step['previous']

        path.append(self.start_dot)

        path.reverse()

        return path


testArr = [
    [0, 0, 0, -1, -1],
    [0, 0, 0, -1, 0],
    [0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0],
    [-1, -1, 0, 0, 0]
]

start_dot_test = {
    'x': 0,
    'y': 0,
    'previous': None
}

finish_dot_test = {
    'x': 1,
    'y': 4,
    'previous': None
}

path = PathFindV1(testArr, start_dot_test, finish_dot_test).find_path()

if path is not False:
    result_arr = testArr

    i = 0

    for el in path:
        result_arr[el['x']][el['y']] = i
        i += 1

    for el in result_arr:
        print(el)
