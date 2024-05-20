# User auto filler

This is an extension to fill the multiple users in less time when we don't have database access.

## Installation

Get the latest pull by using the below commands:
``` bash
git clone https://github.com/Mspiro/Drupal-user-fill.git
```
### Note that: we didn't host the extension online so we have to manually install it on our Chrome.


## Steps to install extension

* Go to manage extension settings in Chrome.
* On the top right corner turn on the toggle button called `Developer mode`.
* From the left corner buttons choose `Load Unpacked`.
* Choose your cloned folder. (Remember we have to choose the whole folder without opening it.)
* Now you can see the new extension added to the extensions list.
* Make it pin to


We need some Python libraries, So install them by using the package manager [pip](https://pip.pypa.io/en/stable/).

Press `alt+ctrl+t` and paste the below commands.

```bash
pip install flask
pip install flask-cors
```
Now choose your JSON data file. Paste it in the extensions folder where you cloned it and rename it to `UsersData.json`.

Now we have to start the server to catch the response from the extension.

To start the server go to the extension folder open the terminal here and paste the below command.
```bash
python3 server.py
```
Now go to your site's/admin/people/create` page and open the extension. Press the button `Start Autofill`.