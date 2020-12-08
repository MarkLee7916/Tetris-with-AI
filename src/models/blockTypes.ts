const square = [[[0, 0], [0, 1], [1, 0], [1, 1]],
			    [[0, 0], [0, 1], [1, 0], [1, 1]], 
			    [[0, 0], [0, 1], [1, 0], [1, 1]], 
			    [[0, 0], [0, 1], [1, 0], [1, 1]]];

const shapeT = [[[0, 0], [0, 1], [0, 2], [1, 1]], 
		        [[0, 0], [1, 0], [2, 0], [1, 1]], 
		        [[1, 1], [1, 2], [1, 3], [0, 2]], 
		        [[1, 1], [0, 2], [1, 2], [2, 2]]];

const line = [[[0, 0], [0, 1], [0, 2], [0, 3]], 
			  [[0, 0], [1, 0], [2, 0], [3, 0]], 
			  [[0, 0], [0, 1], [0, 2], [0, 3]], 
			  [[0, 0], [1, 0], [2, 0], [3, 0]]];

const shapeL = [[[0, 0], [1, 0], [2, 0], [2, 1]], 
	            [[1, 1], [1, 2], [1, 3], [0, 3]], 
				[[0, 0], [0, 1], [1, 0], [2, 0]], 
				[[0, 0], [1, 0], [1, 1], [1, 2]]];

const mirror = 	[[[0, 0], [0, 1], [1, 1], [1, 2]], 
	             [[2, 2], [1, 2], [1, 3], [0, 3]], 
				 [[1, 1], [1, 2], [0, 2], [0, 3]], 
                 [[0, 0], [1, 0], [1, 1], [2, 1]]];
                     
export const blockTypes = [square, shapeT, line, shapeL, mirror];