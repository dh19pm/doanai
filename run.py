import speech_recognition
import pyaudio
import pyttsx3
import datetime

mic = speech_recognition.Recognizer()
siben = pyttsx3.init()

while True:

	with speech_recognition.Microphone(device_index = 1) as source:
		mic.adjust_for_ambient_noise(source, duration = 1)
		print("ROBOT: I'm listenning")
		audio = mic.listen(source)

	print("ROBOT: ...")

	try:
		you = mic.recognize_google(audio)
	except:
		you = ""

	if "bye" in you:
		break

	print("YOU: " + you)

	if you == "hello":
		robot = "Hello! Si Ben"

	elif you == "what time is it":
		robot = "The present time: " + datetime.datetime.now().strftime("%B %d, %Y")

	elif you == "who are you":
		robot = "I'm Robot"

	else:
		robot = you

	print("ROBOT: " + robot + "\n")
	voices = siben.getProperty('voices')
	siben.say(robot)
	siben.runAndWait()