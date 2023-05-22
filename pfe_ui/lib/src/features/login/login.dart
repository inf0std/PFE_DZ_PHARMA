import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  @override
  LoginState createState() => LoginState();
}


class LoginState extends State<Login> {
  @override
  Widget build(BuildContext context){
    return Scaffold (
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text("Connexion"),
        ),
        body: SingleChildScrollView(
            child: Column(
                children: <Widget>[
                  //*
                  Padding(
                    padding: const EdgeInsets.only(top: 60.0),
                    child: Center(
                      child : Container(
                        width: 200,
                        height: 150,
                        child: Image.asset('assets/images/logo.png'),
                      ),
                    ),
                  ),//*/
                  //for EMAIL
                  const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 15),
                      child: TextField(
                          decoration: InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'EMAIL',
                              hintText: 'Entrez votre EMail'
                          )
                      )
                  ),
                  //for PASSWORD
                  const Padding(
                      padding: EdgeInsets.only(left: 15.0, right: 15.0, top: 15.0, bottom: 0),
                      child: TextField(
                        obscureText: true,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'MOT DE PASSE',
                            hintText: 'Entrez mot de passe'
                        ),
                      )
                  ),
                  TextButton(
                    style: TextButton.styleFrom(
                      foregroundColor: Colors.blue,
                      minimumSize: const Size(88, 44),
                      padding: const EdgeInsets.symmetric(horizontal:16.0),
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(2.0)),
                      ),
                      backgroundColor: Colors.white,
                    ),
                    onPressed: (){
                      // go to password reinitialisation
                    },
                    child: const Text('mot de passe oublier'),
                  ),
                  Container(
                    height: 50,
                    width: 250,
                    decoration: BoxDecoration(
                        color: Colors.blue,
                        borderRadius: BorderRadius.circular(20)
                    ),
                    child: TextButton(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.white,
                        minimumSize: const Size(88, 44),
                        padding: const  EdgeInsets.symmetric(horizontal:16.0),
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(2.0)),
                        ),
                        backgroundColor: Colors.blue,
                      ),
                      onPressed: (){
                        //login
                      },
                      child: const Text(
                        'Se connecter',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 25
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ), TextButton(
                    style: TextButton.styleFrom(
                        foregroundColor: Colors.blue,
                        backgroundColor: Colors.white,
                        minimumSize: const Size(88,44),
                        padding: const EdgeInsets.symmetric(horizontal: 16.0)
                    ),
                    onPressed: (){

                    },
                    child: const Text('Pas de compte, s\'inscrire'),
                  )
                ]
            )
        )
    );
  }
}