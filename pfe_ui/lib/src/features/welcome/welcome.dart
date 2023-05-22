import 'package:flutter/material.dart';
import 'package:pfe_ui/src/features/login/login.dart';
import 'package:pfe_ui/src/features/signup/signup.dart';

class Welcome extends StatefulWidget {
  @override
  WelcomeState createState() => WelcomeState();
}


class WelcomeState extends State<Welcome> {
  @override
  Widget build(BuildContext context){
    return Scaffold (
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text("Connexion"),
        ),
        body: Padding(
            padding: const EdgeInsets.all(20),
            child: ListView(
                children: <Widget>[
                  Container(
                   alignment: Alignment.center,
                   padding: EdgeInsets.all(15.0),
                   child: const Text('Bienvenue',
                     style: TextStyle(
                          color:Colors.blue,
                          fontSize: 40,
                        fontWeight: FontWeight.w500
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.only(top: 60.0),
                    child: Center(
                      child : Container(
                        width: 200,
                        height: 150,
                        child: Image.asset('assets/images/logo.png'),
                      ),
                    ),
                  ),//*
                  Container(
                    height: 50,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        foregroundColor: Colors.black87,
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(2)),
                        ),
                        backgroundColor: Colors.white,
                      ),
                      onPressed: (){
                        // go to login
                        Navigator.push(context, MaterialPageRoute(builder: (context)=>Login()));
                      },
                      child: const Text(
                        'Se connecter',
                        style: TextStyle(
                            color: Colors.black87,
                            fontSize: 25
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height:10),
                  Container(
                    height: 50,
                    width: 250,
                    decoration: BoxDecoration(
                        color: Colors.blue,
                        borderRadius: BorderRadius.circular(20)
                    ),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        foregroundColor: Colors.white,
                        minimumSize: const Size(88, 44),
                        padding: const  EdgeInsets.symmetric(horizontal:16.0),
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(2.0)),
                        ),
                        backgroundColor: Colors.blue,
                      ),
                      onPressed: (){
                        //go to signup
                        Navigator.push(context, MaterialPageRoute(builder: (context)=>Signup()));
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
                ]
            )
        )
    );
  }
}