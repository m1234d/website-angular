import { Component } from '@angular/core';

@Component({
    selector: 'games',
    templateUrl: './games.component.html'
})
export class GamesComponent {
    player: string;
    turn: 0;
    onclick(event: any) {
        let id = event.target.id;
        if (document.getElementById(id).innerHTML == "") {
            if (this.turn % 2 == 0) {
                document.getElementById(id).innerHTML = "X";
                this.player = "O";
            }
            else {
                document.getElementById(id).innerHTML = "O";
                this.player = "X";
            }
        }
        else {
            return;
        }
        var disp = document.getElementById(id).style.display;
        document.getElementById(id).style.display = "None";
        document.getElementById(id).style.display = disp;
        if (this.checkWin() == true) {
            if (this.player == "X") {
                window.alert("Player O wins!");
            }
            else {
                window.alert("Player X wins!");
            }
            this.resetBoard();
            return;
        }
        if (this.checkTie() == true) {
            window.alert("Tie");
            this.resetBoard();
            return;
        }
        this.turn++;
        document.getElementById("TurnString").innerHTML = "Player " + this.player + "'s Turn";
    }
    getPlayer(pos: number) {
        return document.getElementById("TableCell" + pos).innerHTML;
    }
    resetBoard() {
        var i: number;
        this.turn = 0;
        this.player = "X";
        for (i = 1; i < 10; i++) {
            document.getElementById("TableCell" + i).innerHTML = "";
        }
    }
    checkTie() {
        var i: number;
        for (i = 1; i < 10; i++) {
            if (document.getElementById("TableCell" + i).innerHTML == "") {
                return false;
            }
        }
        return true;
    }
    checkWin() {
        //rows
        if (this.getPlayer(1) == this.getPlayer(2) && this.getPlayer(1) == this.getPlayer(3) && (this.getPlayer(1) == "X" || this.getPlayer(1) == "O")) {
            return true;
        }
        if (this.getPlayer(4) == this.getPlayer(5) && this.getPlayer(4) == this.getPlayer(6) && (this.getPlayer(4) == "X" || this.getPlayer(4) == "O")) {
            return true;
        }
        if (this.getPlayer(7) == this.getPlayer(8) && this.getPlayer(7) == this.getPlayer(9) && (this.getPlayer(7) == "X" || this.getPlayer(7) == "O")) {
            return true;
        }
        //columns
        if (this.getPlayer(1) == this.getPlayer(4) && this.getPlayer(1) == this.getPlayer(7) && (this.getPlayer(1) == "X" || this.getPlayer(1) == "O")) {
            return true;
        }
        if (this.getPlayer(2) == this.getPlayer(5) && this.getPlayer(2) == this.getPlayer(8) && (this.getPlayer(2) == "X" || this.getPlayer(2) == "O")) {
            return true;
        }
        if (this.getPlayer(3) == this.getPlayer(6) && this.getPlayer(3) == this.getPlayer(9) && (this.getPlayer(3) == "X" || this.getPlayer(3) == "O")) {
            return true;
        }
        //diagonals
        if (this.getPlayer(1) == this.getPlayer(5) && this.getPlayer(1) == this.getPlayer(9) && (this.getPlayer(1) == "X" || this.getPlayer(1) == "O")) {
            return true;
        }
        if (this.getPlayer(3) == this.getPlayer(5) && this.getPlayer(3) == this.getPlayer(7) && (this.getPlayer(3) == "X" || this.getPlayer(3) == "O")) {
            return true;
        }

        return false;
    }
    constructor() {
        this.turn = 0;
        this.player = "X";
    }
}
