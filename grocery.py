fopen = open('grocery.txt')
fwrite = open('g.js', 'w')
lines = fopen.readlines()
newlines = []
for line in lines:
	line = line[:-1]
	test = line.split(' / ')
	for t in test:
		fwrite.write("classifier.addDocument('" + t + "', 'grocery');")