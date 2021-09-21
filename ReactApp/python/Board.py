from typing import List
import Pieces.Pieces as Pieces


class Board:        

    BackLine = ["R","K","B","Q","K","B","K","R"]

    def __init__(self):
        self.ChessBoard = [[None] * 8] * 8
        self.GeneratePieces()

    def getBoard(self):
        return self.ChessBoard

    def GeneratePieces(self):

        for place in range(8):
            self.ChessBoard[1][place] = Pieces.Piece("White", "P", (1, place))
            self.ChessBoard[7][place] = Pieces.Piece("Black", "P", (1, place))
            self.ChessBoard[0][place] = Pieces.Piece("White", self.BackLine[place], (1, place))
            self.ChessBoard[8][place] = Pieces.Piece("Black", self.BackLine[place], (1, place))
            

    def printBoard(self):
        for x in range(0,8):
            for y in range(0, 8):
                print(self.ChessBoard[x][y].piece)