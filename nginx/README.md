# nginx
we want config nginx for our website

### step 1: Create The directory structure
first you need to create a directory for static contents.

    sudo mkdir -p /var/www/ama-project.com/html
    sudo chown -R $USER:$USER /var/www/ama-project.com/html
    sudo chmod -R 755 /var/www
    echo hello > /var/www/ama-project.com/html/index.html
    
the `$USER` is your username.
### step 2: Create New Server Block Files
make directory for our server blocks:

    sudo mkdir /etc/nginx/sites-available
    sudo mkdir /etc/nginx/sites-enabled
tell Nginx to look for server blocks in the `sites-enabled`:
open `/etc/nginx/nginx.conf` with root permission:

    sudo vim /etc/nginx/nginx.conf
add these lines to the end of the `http {}` block:

	include /etc/nginx/sites-enabled/*.conf;
	server_names_hash_bucket_size 64;
then copy nginx config

    cd path_to_webProject/nginx/
    sudo cp ama-project.com.conf /etc/nginx/sites-available/ama-project.com.conf
    cd /etc/nginx/sites-enabled/
    sudo ln -s ../sites-available/ama-project.com.conf .
    
and restart nginx

    sudo systemctl restart nginx
### step 3: set up local host and visit website
add this line to `/etc/hosts` in your **client machine**

    server_ip_addres ama_project.com
   `server_ip_addres` is  your server's `ip`
and now open your browser and go to `http://ama_project.com` 
