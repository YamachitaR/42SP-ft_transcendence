FROM nginx:1.25

# Install necessary utilities
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gawk \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Define the working directory
RUN mkdir /home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Create the static and media files directory
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles

# Update the permissions of the directories to Nginx
RUN chown -R nginx:nginx $APP_HOME/staticfiles $APP_HOME/mediafiles
RUN chmod -R 755 $APP_HOME/staticfiles $APP_HOME/mediafiles
