#remove the trailing and in between extra spaces
def textCleanser(input):
    output = ' '.join(input.split())
    output = output.strip()
    output = output.lower()
    return output

def trimmer(input):
    output = input.strip()
    return output

def cleanMobileNumber(input):
    input = ' '.join(input.split())
    input = input.replace(" ","")
    input = input.replace("-", "")
    input = input.strip()
    input = input[-10:]
    return input
