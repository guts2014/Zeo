fopen = open('artists.txt')
fwrite = open('a.js', 'w')
lines = fopen.readlines()
newlines = []
for line in lines:
	line = line[:-1]
	fwrite.write("classifier.addDocument('" + line + "', 'band');")