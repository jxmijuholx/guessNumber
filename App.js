import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function GuessNumber() {

  // satunnainen numero = generoiRandomNumero
  const [randomNumber, setRandomNumber] = useState(generoiRandomNumber())
  // arvauksien määrä
  const [laskuri, setLaskuri] = useState(0)
  // koneen vastaus arvaukseesi
  const [vastaus, setVastaus] = useState("")
  // oma arvaus
  const [guess, setGuess] = useState("")
  // pelin lopetus
  const [gameOver, setGameOver] = useState(false)

  // käsittele käyttäjän syöte
  function handleChange(text){
    setGuess(text)
  }

  useEffect(() => { 
    setLaskuri(0);  
}, [randomNumber]);

  // generoi satunnainen numero
function generoiRandomNumber(){
  return  Math.floor(Math.random() * 100) + 1
}

// nollaa peli
function nollaaPeli() {
  setGameOver(false);
  setLaskuri(0);
  setVastaus("");
  setGuess("");
  setRandomNumber(generoiRandomNumber());
}

// funktio käsittelemään arvaus eli sovelluslogiikka
function tarkastaArvaus(){

let apumuuttuja = ""

    if(isNaN(guess)){
      apumuuttuja = "Heitäppä mieluusti numero"
    }else if(parseInt(guess) < 1 || parseInt(guess) > 100){
      apumuuttuja = "Anna numero, joka toteuttaa ehdon 1 >= numero <= 100"
    }else{
      setLaskuri(laskuri + 1)
      if(parseInt(guess) < randomNumber)
      {
        apumuuttuja = "Arvaus on väärin ;) Syötä isompi numero"
      }else if(parseInt(guess) > randomNumber)
      {
        apumuuttuja = "Arvaus on väärin ;) Syötä pienempi numero"
      }else if(parseInt(guess) === randomNumber)
      {
        apumuuttuja = `Juhuuuu! Arvasit oikein! Se vaati sinulta ${laskuri} arvausta`

      }else{
        apumuuttuja = "Eksyit XD mee himaas"
      }

      setVastaus(apumuuttuja)

    }

    // samalla kun kirjoitin tämän koodin niin tajusin, että se on kömpelö 
    // koska tarkastan numeron vaihe kerrallaan ja muutan sen mukaan vastauksen
    // minun pitäisi ottaa käyttöön apumuuttuja ja asettaa stateen apumuuttuja tarkistuslogiikan jälkeen
}



  return (
    <View style={styles.container}>

      <Text>GUESS A NUMBER BETWEEN 1 AND 100 MY FRIEND!</Text>

      <TextInput
      style={styles.input}
      keyboardType='numeric'
      onChangeText={handleChange}
      />

      <Button style={styles.input} title="Make a guess"
        onPress={tarkastaArvaus}
      />

  <Button style={styles.input} title="Give Up"
          onPress={nollaaPeli}
        />
      <Text>Ohjelman mielipide sun arvaustaidoista: {vastaus}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    width: 200,
  },
});
