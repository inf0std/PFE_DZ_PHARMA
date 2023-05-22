import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  @override
  SignupState createState() => SignupState();
}


class SignupState extends State<Signup> {
  @override
  Widget build(BuildContext context){
    return Scaffold (
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text("Inscription"),
        ),
        body: SingleChildScrollView(
            child: Column(
                children: <Widget>[
                  //*
                  Padding(
                    padding: const EdgeInsets.only(top: 60.0),
                    child: Center(
                      child : SizedBox(
                        width: 80,
                        height: 65,
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
                  const Padding(
                      padding: EdgeInsets.only(top:15.0, left:15.0, right: 15.0, bottom: 0),
                      child: TextField(
                          decoration: InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'nom d\'utilisateur',
                              hintText: 'Votre Nom D\'utilisateur'
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
                  ),const Padding(
                      padding: EdgeInsets.only(left: 15.0, right: 15.0, top: 15.0, bottom: 15.0),
                      child: TextField(
                        obscureText: true,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'MOT DE PASSE',
                            hintText: 'Entrez mot de passe'
                        ),
                      )
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
                        padding: const  EdgeInsets.all(15.0),
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(2.0)),
                        ),
                        backgroundColor: Colors.blue,
                      ),
                      onPressed: (){
                        //Signup
                      },
                      child: const Text(
                        'S\'inscrire',
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
                    child: const Text('Deja inscrit, se connecter'),
                  )
                ]
            )
        )
    );
  }
}