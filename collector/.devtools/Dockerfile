FROM andre487/scrapper487-py-common:latest

ADD ./requirements.txt /usr/local/bin/app/requirements.txt

RUN set -x && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get purge -y \
        python-pip binutils build-essential cpp cpp-6 dpkg-dev \
        g++ g++-6 gcc gcc-6 libalgorithm-diff-perl \
        libalgorithm-diff-xs-perl libalgorithm-merge-perl \
        libc-dev-bin libc6-dev  libdpkg-perl libfakeroot \
        libfile-fcntllock-perl libgcc-6-dev  \
        liblocale-gettext-perl libperl5.24 libpython-all-dev libpython-dev \
        libpython2.7-dev libstdc++-6-dev linux-libc-dev make \
        manpages-dev patch perl perl-modules-5.24 \
        python-all-dev python-dev python-gi \
        python-pip-whl python-pkg-resources \
        python-setuptools python-wheel \
        python2.7-dev && \
    apt-get clean -y && \
    apt-get autoclean -y && \
    rm -f /var/cache/apt/*.bin && \
    find /tmp -type f -exec rm {} \; && \
    find /var/tmp -type f -exec rm {} \;

ADD . /usr/local/bin/app
