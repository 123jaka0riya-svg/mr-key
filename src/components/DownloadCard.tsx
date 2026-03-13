"use client";

import { useState } from "react";

interface DownloadCardProps {
  title: string;
  language: string;
  icon: string;
  description: string;
  appName: string;
}

const sdkCodes: Record<string, { code: string; filename: string }> = {
  csharp: {
    filename: "Auth.cs",
    code: `using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class KeyAuth
{
    private string appName = "APP_NAME";
    private string ownerID = "OWNER_ID";
    private string apiKey = "API_KEY";
    private string url = "https://keyauth.win/api/1.2/";
    
    public async Task<bool> Login(string username, string password)
    {
        using (var httpClient = new HttpClient())
        {
            var data = new
            {
                type = "login",
                username = username,
                password = password,
                appname = appName,
                ownerid = ownerID
            };

            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(url + "auth/", content);
            var responseString = await response.Content.ReadAsStringAsync();

            if (responseString.Contains("success"))
            {
                Console.WriteLine("Login successful!");
                return true;
            }
            else
            {
                Console.WriteLine("Login failed: " + responseString);
                return false;
            }
        }
    }

    public async Task<bool> Register(string username, string password, string key)
    {
        using (var httpClient = new HttpClient())
        {
            var data = new
            {
                type = "register",
                username = username,
                password = password,
                key = key,
                appname = appName,
                ownerid = ownerID
            };

            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(url + "auth/", content);
            var responseString = await response.Content.ReadAsStringAsync();

            if (responseString.Contains("success"))
            {
                Console.WriteLine("Registration successful!");
                return true;
            }
            else
            {
                Console.WriteLine("Registration failed: " + responseString);
                return false;
            }
        }
    }

    public async Task<bool> Validate()
    {
        using (var httpClient = new HttpClient())
        {
            var data = new
            {
                type = "validate",
                appname = appName,
                ownerid = ownerID,
                apikey = apiKey
            };

            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(url + "verify/", content);
            var responseString = await response.Content.ReadAsStringAsync();

            return responseString.Contains("success");
        }
    }
}

// Usage Example:
// KeyAuth auth = new KeyAuth();
// await auth.Login("username", "password");
`
  },
  python: {
    filename: "auth.py",
    code: `import requests
import json

class KeyAuth:
    def __init__(self):
        self.app_name = "APP_NAME"
        self.owner_id = "OWNER_ID"
        self.api_key = "API_KEY"
        self.url = "https://keyauth.win/api/1.2/"

    def login(self, username, password):
        data = {
            "type": "login",
            "username": username,
            "password": password,
            "appname": self.app_name,
            "ownerid": self.owner_id
        }
        
        try:
            response = requests.post(self.url + "auth/", json=data)
            result = response.json()
            
            if result.get("success"):
                print("Login successful!")
                return True
            else:
                print(f"Login failed: {result.get('message')}")
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False

    def register(self, username, password, key):
        data = {
            "type": "register",
            "username": username,
            "password": password,
            "key": key,
            "appname": self.app_name,
            "ownerid": self.owner_id
        }
        
        try:
            response = requests.post(self.url + "auth/", json=data)
            result = response.json()
            
            if result.get("success"):
                print("Registration successful!")
                return True
            else:
                print(f"Registration failed: {result.get('message')}")
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False

    def validate(self):
        data = {
            "type": "validate",
            "appname": self.app_name,
            "ownerid": self.owner_id,
            "apikey": self.api_key
        }
        
        try:
            response = requests.post(self.url + "verify/", json=data)
            return response.json().get("success", False)
        except:
            return False

# Usage Example:
# auth = KeyAuth()
# auth.login("username", "password")
`
  },
  nodejs: {
    filename: "auth.js",
    code: `const axios = require('axios');

class KeyAuth {
    constructor() {
        this.appName = "APP_NAME";
        this.ownerID = "OWNER_ID";
        this.apiKey = "API_KEY";
        this.url = "https://keyauth.win/api/1.2/";
    }

    async login(username, password) {
        try {
            const response = await axios.post(this.url + "auth/", {
                type: "login",
                username: username,
                password: password,
                appname: this.appName,
                ownerid: this.ownerID
            });

            if (response.data.success) {
                console.log("Login successful!");
                return true;
            } else {
                console.log("Login failed:", response.data.message);
                return false;
            }
        } catch (error) {
            console.log("Error:", error.message);
            return false;
        }
    }

    async register(username, password, key) {
        try {
            const response = await axios.post(this.url + "auth/", {
                type: "register",
                username: username,
                password: password,
                key: key,
                appname: this.appName,
                ownerid: this.ownerID
            });

            if (response.data.success) {
                console.log("Registration successful!");
                return true;
            } else {
                console.log("Registration failed:", response.data.message);
                return false;
            }
        } catch (error) {
            console.log("Error:", error.message);
            return false;
        }
    }

    async validate() {
        try {
            const response = await axios.post(this.url + "verify/", {
                type: "validate",
                appname: this.appName,
                ownerid: this.ownerID,
                apikey: this.apiKey
            });
            return response.data.success;
        } catch {
            return false;
        }
    }
}

module.exports = KeyAuth;

// Usage Example:
// const auth = new KeyAuth();
// await auth.login("username", "password");
`
  },
  php: {
    filename: "auth.php",
    code: `<?php
class KeyAuth {
    private $appName = "APP_NAME";
    private $ownerID = "OWNER_ID";
    private $apiKey = "API_KEY";
    private $url = "https://keyauth.win/api/1.2/";

    public function login($username, $password) {
        $data = array(
            "type" => "login",
            "username" => $username,
            "password" => $password,
            "appname" => $this->appName,
            "ownerid" => $this->ownerID
        );

        $ch = curl_init($this->url . "auth/");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $result = json_decode($response, true);
        
        if (isset($result['success']) && $result['success']) {
            echo "Login successful!";
            return true;
        } else {
            echo "Login failed: " . ($result['message'] ?? 'Unknown error');
            return false;
        }
    }

    public function register($username, $password, $key) {
        $data = array(
            "type" => "register",
            "username" => $username,
            "password" => $password,
            "key" => $key,
            "appname" => $this->appName,
            "ownerid" => $this->ownerID
        );

        $ch = curl_init($this->url . "auth/");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $result = json_decode($response, true);
        
        if (isset($result['success']) && $result['success']) {
            echo "Registration successful!";
            return true;
        } else {
            echo "Registration failed: " . ($result['message'] ?? 'Unknown error');
            return false;
        }
    }

    public function validate() {
        $data = array(
            "type" => "validate",
            "appname" => $this->appName,
            "ownerid" => $this->ownerID,
            "apikey" => $this->apiKey
        );

        $ch = curl_init($this->url . "verify/");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $result = json_decode($response, true);
        return isset($result['success']) && $result['success'];
    }
}

// Usage Example:
// $auth = new KeyAuth();
// $auth->login("username", "password");
?>
`
  },
  vbnet: {
    filename: "Auth.vb",
    code: `Imports System.Net.Http
Imports System.Text
Imports System.Text.Json

Public Class KeyAuth
    Private appName As String = "APP_NAME"
    Private ownerID As String = "OWNER_ID"
    Private apiKey As String = "API_KEY"
    Private url As String = "https://keyauth.win/api/1.2/"

    Public Async Function Login(username As String, password As String) As Task(Of Boolean)
        Using httpClient As New HttpClient()
            Dim data = New With {
                .type = "login",
                .username = username,
                .password = password,
                .appname = appName,
                .ownerid = ownerID
            }

            Dim json = JsonSerializer.Serialize(data)
            Dim content = New StringContent(json, Encoding.UTF8, "application/json")

            Dim response = Await httpClient.PostAsync(url & "auth/", content)
            Dim responseString = Await response.Content.ReadAsStringAsync()

            If responseString.Contains("success") Then
                Console.WriteLine("Login successful!")
                Return True
            Else
                Console.WriteLine("Login failed: " & responseString)
                Return False
            End If
        End Using
    End Function

    Public Async Function Register(username As String, password As String, key As String) As Task(Of Boolean)
        Using httpClient As New HttpClient()
            Dim data = New With {
                .type = "register",
                .username = username,
                .password = password,
                .key = key,
                .appname = appName,
                .ownerid = ownerID
            }

            Dim json = JsonSerializer.Serialize(data)
            Dim content = New StringContent(json, Encoding.UTF8, "application/json")

            Dim response = Await httpClient.PostAsync(url & "auth/", content)
            Dim responseString = Await response.Content.ReadAsStringAsync()

            If responseString.Contains("success") Then
                Console.WriteLine("Registration successful!")
                Return True
            Else
                Console.WriteLine("Registration failed: " & responseString)
                Return False
            End If
        End Using
    End Function

    Public Async Function Validate() As Task(Of Boolean)
        Using httpClient As New HttpClient()
            Dim data = New With {
                .type = "validate",
                .appname = appName,
                .ownerid = ownerID,
                .apikey = apiKey
            }

            Dim json = JsonSerializer.Serialize(data)
            Dim content = New StringContent(json, Encoding.UTF8, "application/json")

            Dim response = Await httpClient.PostAsync(url & "verify/", content)
            Dim responseString = Await response.Content.ReadAsStringAsync()

            Return responseString.Contains("success")
        End Using
    End Function
End Class

' Usage Example:
' Dim auth As New KeyAuth()
' Await auth.Login("username", "password")
`
  },
  java: {
    filename: "Auth.java",
    code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class KeyAuth {
    private String appName = "APP_NAME";
    private String ownerID = "OWNER_ID";
    private String apiKey = "API_KEY";
    private String url = "https://keyauth.win/api/1.2/";

    public boolean login(String username, String password) {
        try {
            String json = String.format(
                "{\"type\":\"login\",\"username\":\"%s\",\"password\":\"%s\",\"appname\":\"%s\",\"ownerid\":\"%s\"}",
                username, password, appName, ownerID
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "auth/"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String result = response.body();

            if (result.contains("\"success\":true")) {
                System.out.println("Login successful!");
                return true;
            } else {
                System.out.println("Login failed: " + result);
                return false;
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    public boolean register(String username, String password, String key) {
        try {
            String json = String.format(
                "{\"type\":\"register\",\"username\":\"%s\",\"password\":\"%s\",\"key\":\"%s\",\"appname\":\"%s\",\"ownerid\":\"%s\"}",
                username, password, key, appName, ownerID
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "auth/"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String result = response.body();

            if (result.contains("\"success\":true")) {
                System.out.println("Registration successful!");
                return true;
            } else {
                System.out.println("Registration failed: " + result);
                return false;
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    public boolean validate() {
        try {
            String json = String.format(
                "{\"type\":\"validate\",\"appname\":\"%s\",\"ownerid\":\"%s\",\"apikey\":\"%s\"}",
                appName, ownerID, apiKey
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "verify/"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body().contains("\"success\":true");
        } catch (Exception e) {
            return false;
        }
    }
}

// Usage Example:
// KeyAuth auth = new KeyAuth();
// auth.login("username", "password");
`
  }
};

export function DownloadCard({ title, language, icon, description, appName }: DownloadCardProps) {
  const [showCode, setShowCode] = useState(false);
  const sdk = sdkCodes[language];

  const downloadFile = () => {
    const code = sdk.code.replace(/APP_NAME/g, appName);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = sdk.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const code = sdk.code.replace(/APP_NAME/g, appName);
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-[#2a2a3a] rounded-lg flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={downloadFile}
          className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition text-sm"
        >
          Download
        </button>
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-4 py-2 bg-[#2a2a3a] hover:bg-[#3a3a4a] rounded-lg transition text-sm"
        >
          {showCode ? "Hide" : "View"}
        </button>
      </div>

      {showCode && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{sdk.filename}</span>
            <button
              onClick={copyToClipboard}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Copy
            </button>
          </div>
          <pre className="bg-[#121218] p-3 rounded-lg text-xs text-gray-300 overflow-x-auto max-h-64">
            {sdk.code.replace(/APP_NAME/g, appName)}
          </pre>
        </div>
      )}
    </div>
  );
}
