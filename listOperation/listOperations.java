import java.util.*;

class listOperations {
    // Declaring a list of integers
    List<Integer> list = new ArrayList<Integer>();

    // method to add elements to the list
    public void addElements(int element) {
        // add elements to the list
        list.add(element);
    }

    public void printList() {
        // print the list
        System.out.println("List : " + list);
    }

    public void getAverage() {
        // If number of scores is 0 then return null/undefined
        if (list.size() == 0) {
            System.out.println("Average is undefined");
            return;
        }
        // If number of scores <= 2 then return avg of all
        if (list.size() <= 2) {
            int sum = 0;
            for (int i = 0; i < list.size(); i++) {
                sum += list.get(i);
            }
            // print the average in decimal format
            System.out.println("Current average is : " + (float) sum / list.size());

            return;
        }
        // if number of score > 2 then return avg excluding min and max
        if (list.size() > 2) {
            int sum = 0;
            int min = list.get(0);
            int max = list.get(0);
            for (int i = 0; i < list.size(); i++) {
                sum += list.get(i);
                if (list.get(i) < min) {
                    min = list.get(i);
                }
                if (list.get(i) > max) {
                    max = list.get(i);
                }
            }
            System.out
                    .println("Current Average with " + list.size() + " elements in the list is : "
                            + (float) ((sum - min - max) / (list.size() - 2)));

        }
    }

    public static void main(String[] args) {
        // Declaring a listOperations object
        listOperations obj = new listOperations();
        System.out.println("Enter the number of elements to add: ");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        // taking input from the user
        for (int i = 0; i < n; i++) {
            System.out.println("Enter the " + (i + 1) + "th element: ");
            int element = sc.nextInt();
            // add the element to the list
            obj.addElements(element);
            // calculating current average
            obj.getAverage();

        }
        // print the list
        obj.printList();

    }
}
