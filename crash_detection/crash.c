const int triggerPin = 7;
const int echoPin = 4;
int buzz = 10;
long duration;
int distance;
void setup() {
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(13, OUTPUT);
  pinMode(2, OUTPUT);
  Serial.begin(9600);
}
void loop()
{
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration*0.034/2;
  if(distance <= 50 && distance >= 20)
  {
    digitalWrite(13, HIGH);
  }
  else
  {
    digitalWrite(13, LOW);
  }
  if(distance <= 20)
  {
    system("curl 'https://api.twilio.com/2010-04-01/Accounts/ACe99ed13e73366411834139b4bd5c3e12/Messages.json' -X POST \
--data-urlencode 'To=whatsapp:+919325397586' \
--data-urlencode 'From=whatsapp:+14155238886' \
--data-urlencode 'Body=Hello Atharva, we noticed that your vehicle MH 12 BF 3030 has recently been in an accident, as you are a valuable customer for us. Would you like to file a claim for your vehicle’s damages. Click below to apply for a claim : https://www.bajajallianz.com/motor-insurance/motor-insurance-claim-process.html We see that you don’t have an insurance policy would you like to buy one from us? https://www.bajajallianz.com/health-insurance-plans.html' \
-u ACe99ed13e73366411834139b4bd5c3e12:[AuthToken]");
      
    digitalWrite(2, HIGH);
    tone(buzz, 2000);
    delay(100);
    noTone(buzz);
    delay(100);
    tone(buzz, 2000);
    delay(100);
    noTone(buzz);
    delay(100);
    tone(buzz, 2000);
    delay(100);
    noTone(buzz);
    tone(buzz, 2000);
    delay(100);
    noTone(buzz);
    delay(100);
  }
  else
  {
    digitalWrite(2, LOW);
  }
}
    