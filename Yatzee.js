let values = [0,0,0,0,0];
let throwCount = 0;
let upperSecScore = 0;


function resetThrowCount() {
    throwCount = 0;
}

function getValues() {
    return values;
}

function getThrowCount() {
    return throwCount;
}

    /**
     * Rolls the 5 dice. Only roll dice that are not hold. Pre: holds contain 5
     * boolean values.
     */
    function throwDice(holds) {
        for (let i = 0; i < 5; i++) {
            if (!holds[i] && throwCount < 3) {
                let randomNumber = Math.floor(Math.random()*5)+1;
                values[i] = randomNumber;
            }
        }
        if (throwCount < 3) {
            throwCount++;
        }
    }

    
    // -------------------------------------------------------------------------

    /**
     * Returns all results possible with the current face values. The order of
     * the results is the same as on the score board. Note: This is an optional
     * method. Comment this method out, if you don't want use it.
     */
    function getResults() {
        let results = [];
        for (let i = 0; i <= 5; i++) {
            results[i] = this.sameValuePoints(i + 1);
        }
        results[6] = this.onePairPoints();
        results[7] = this.twoPairPoints();
        results[8] = this.threeSamePoints();
        results[9] = this.fourSamePoints();
        results[10] = this.fullHousePoints();
        results[11] = this.smallStraightPoints();
        results[12] = this.largeStraightPoints();
        results[13] = this.chancePoints();
        results[14] = this.yatzyPoints();

        return results;
    }

    // -------------------------------------------------------------------------

    // Returns an int[7] containing the frequency of face values.
    // Frequency at index v is the number of dice with the face value v, 1 <= v
    // <= 6.
    // Index 0 is not used.
    function calcCounts() {
        let freq = [0,0,0,0,0,0,0];
        for (let i = 0; i < freq.length; i++) {
            for (let j = 0; j < values.length; j++) {
                if (i == values[j]) {
                    freq[i] += 1;
                }
            }
        }
        return freq;
    }

    /**
     * Returns same-value points for the given face value. Returns 0, if no dice
     * has the given face value. Pre: 1 <= value <= 6;
     */
    function sameValuePoints(value) {
        let freq = calcCounts();
        let dieValue = freq[value];
        return value * dieValue;
    }

    /**
     * Returns points for one pair (for the face value giving highest points).
     * Returns 0, if there aren't 2 dice with the same face value.
     */
      function onePairPoints() {
        let points = 0;
        let freq = calcCounts();
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 2 && points < i * 2) {
                points = i * 2;
            }
        }
        return points;
    }

    /**
     * Returns points for two pairs (for the 2 face values giving highest
     * points). Returns 0, if there aren't 2 dice with one face value and 2 dice
     * with a different face value.
     */
    function twoPairPoints() {
        let points = 0;
        freq = calcCounts();
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 2 && points < i * 2) {
                for (let j = i + 1; j < freq.length; j++) {
                    if (freq[j] >= 2) {
                        points = (i * 2) + (j * 2);
                    }
                }
            }
        }
        return points;
    }

    /**
     * Returns points for 3 of a kind. Returns 0, if there aren't 3 dice with
     * the same face value.
     */
    function threeSamePoints() {
        let points = 0;
        let freq = calcCounts();
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 3 && points < i * 3) {
                points = i * 3;
            }
        }
        return points;
    }

    /**
     * Returns points for 4 of a kind. Returns 0, if there aren't 4 dice with
     * the same face value.
     */
    function fourSamePoints() {
        let points = 0;
        let freq = calcCounts();
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 4 && points < i * 4) {
                points = i * 4;
            }
        }
        return points;
    }

    /**
     * Returns points for full house. Returns 0, if there aren't 3 dice with one
     * face value and 2 dice a different face value.
     */
    function fullHousePoints() {
        let points = 0;
        let freq = calcCounts();
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] == 2 || freq[i] == 3) {
                for (let j = i + 1; j < freq.length; j++) {
                    if (freq[j] == 2 || freq[j] == 3) {
                        if (freq[i] == 3 || freq[j] == 3) {
                            points = (i * freq[i]) + (j * freq[j]);
                        }
                    }
                }
            }
        }
        return points;
    }

    /**
     * Returns points for small straight. Returns 0, if the dice are not showing
     * 1,2,3,4,5.
     */
    function smallStraightPoints() {
        let holder = 0;
        let freq = calcCounts();
        for (let i = 0; i < freq.length - 1; i++) {
            if (freq[i] == 1) {
                holder += 1;
            }
        }
        if (holder == 5) {
            return 15;
        }
        return 0;
    }

    /**
     * Returns points for large straight. Returns 0, if the dice is not showing
     * 2,3,4,5,6.
     */
    function largeStraightPoints() {
        let holder = 0;
        let freq = calcCounts();
        for (let i = 2; i < freq.length; i++) {
            if (freq[i] == 1) {
                holder += 1;
            }
        }
        if (holder == 5) {
            return 20;
        }
        return 0;
    }

    /**
     * Returns points for chance.
     */
    function chancePoints() {
        let points = 0;
        for (let i = 0; i < values.length; i++) {
            points += values[i];
        }
        return points;
    }

    /**
     * Returns points for yatzy. Returns 0, if there aren't 5 dice with the same
     * face value.
     */
    function yatzyPoints() {
        let points = 0;
        let freq = calcCounts();
        for (let i = 1; i < freq.length; i++) {
            if (freq[i] == 5) {
                points = 50;
                break;
            }
        }
        return points;
    }